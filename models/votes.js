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

     create(data){
         const newVote = {
             id: uuid.v4(),
             user_id: data.user_id || '',
             question_id: data.question_id || '',
             vote_type: data.vote,
             created_at: moment().format('YYYY-MM-DD H:mm')
         };

         const query = QueryBuilder.insert(this.table,newVote);
         return this.pool.query(query)
             .then(()=>{
                 return newVote;
             }).catch(()=>{
                 return 'failure';
             })
     }

     getOne(id){
         const vote = {
             id,
         };
         const query = QueryBuilder.fetch(this.table,'*', vote);
         return this.pool.query(query).then((result)=>{
             if(result.rows.length>0)
                 return result.rows[0];
             return 'failure';
         }).catch(()=>{
             return 'failure';
         });
     }

     update(vote,data){
         const newVote ={
             vote_type: data.vote || vote.vote_type,
             updated_at:  moment().format('YYYY-MM-DD H:mm')
         };

         const query = QueryBuilder.update(this.table,newVote,`id='${newVote.id}'`);
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
         const whereClause =`
         COUNT(vote_type) filter (where vote_type = TRUE) as up,
         COUNT(vote_type) filter (where vote_type = FALSE) as down,
         `;
         const query = QueryBuilder.fetchWithClause(this.table,whereClause,`question_id='${id}'`);
         return this.pool.query(query).then((result)=>{
             return result.rows;
         }).catch(()=>{
             return 'failure';
         })
     }
}

export default new VotesModel();