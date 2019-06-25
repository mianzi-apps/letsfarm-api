import uuid from "uuid";
import moment from "moment";
import QueryBuilder from "../db/queryBuilder";

const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

class VotesModel {
     constructor(){
       this.pool = new Pool({connectionString:process.env.DATABASE_URL});
       this.pool.on('connect',()=>{
           console.log('connected to db in votes model');
       });
       this.table = 'votes';
     }

     async create(data){
         const newVote = {
             id: uuid.v4(),
             user_id: data.user_id || '',
             question_id: data.qn_id || '',
             vote_type: data.vote,
             created_at: moment().format('YYYY-MM-DD H:mm')
         };

         const voteCheck = await new VotesModel().checkUserVoting(newVote.user_id, newVote.question_id);
         if (voteCheck==="failure"){
             const query = QueryBuilder.insert(this.table,newVote);
             return this.pool.query(query)
                 .then(()=>{
                     return newVote;
                 }).catch(()=>{
                     return 'failure';
                 })
         }else{
             if(voteCheck.vote_type===newVote.vote_type){
                 //delete
                return await new VotesModel().delete(voteCheck.id);
             }else{
                 //update
                 return await new VotesModel().update(voteCheck,newVote);
             }
         }

     }

     checkUserVoting(userId,qnId){
         const whereClause =`
            user_id='${userId}' AND
            question_id='${qnId}'
         `;
         const query = QueryBuilder.fetchWithClause(this.table,'*',whereClause);
         return this.pool.query(query).then((result)=>{
             if(result.rows.length>0)
                 return result.rows[0];
             return 'failure';
         }).catch(()=>{
             return 'failure';
         })
     }

     update(vote,data){
         const newVote ={
             vote_type: data.vote || vote.vote_type,
             updated_at:  moment().format('YYYY-MM-DD H:mm')
         };

         const query = QueryBuilder.update(this.table,newVote,`id='${vote.id}'`);
         return this.pool.query(query).then((result)=>{
             if(result.rowCount>0){
                 return 'success';
             }else {
                 return 'failure';
             }
         }).catch(()=>{
             return 'failure';
         });
     }

     delete(id){
         const query = QueryBuilder.deleteFromTable(this.table,`id='${id}'`);
         return this.pool.query(query).then((result)=>{
             if(result.rowCount>0){
                 return 'success';
             }else {
                 return 'failure';
             }
         }).catch(()=>{
             return 'failure';
         });
     }

     getAll(id){
         const columns =`
         count(nullif(vote_type = false, true)) as up,
         count(nullif(vote_type = true, true)) as down    
         `;

         const query = QueryBuilder.fetchWithClause(this.table,columns,`question_id='${id}'`);
         return this.pool.query(query).then((result)=>{
             return result.rows;
         }).catch((error)=>{
             console.log(error);
             return 'failure';
         })
     }
}

export default new VotesModel();
