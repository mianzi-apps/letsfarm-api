import uuid from "uuid";
import moment from "moment";
import Model from './genericModel';
const table='votes';
class VotesModel extends Model{
     constructor(table){
       super(table);
     }

     async create(data){
         const newVote = {
             id: uuid.v4(),
             user_id: data.user_id || '',
             question_id: data.qn_id || '',
             vote_type: data.vote,
             created_at: moment().format('YYYY-MM-DD H:mm')
         };

         const voteCheck = await new VotesModel(table).checkUserVoting(newVote.user_id, newVote.question_id);
         if (voteCheck==="failure"){
             return super.create(newVote);
         }else{
             if(voteCheck.vote_type===newVote.vote_type){
                 //delete
                return await super.delete(voteCheck.id);
             }else{
                 //update
                 return await new VotesModel(table).update(voteCheck,newVote);
             }
         }
     }

     checkUserVoting(userId,qnId){
         const whereClause =`
            user_id='${userId}' AND
            question_id='${qnId}'
         `;
         return super.getOne(null,null,whereClause);
     }

     update(vote,data){
         const newVote ={
             vote_type: data.vote || vote.vote_type,
             updated_at:  moment().format('YYYY-MM-DD H:mm')
         };

         const clause = `id='${vote.id}'`;
         return super.update(newVote,clause);
     }

     getAll(id){
         const columns =`
         count(nullif(vote_type = false, true)) as up,
         count(nullif(vote_type = true, true)) as down    
         `;
         const clause =`question_id='${id}'`;
         return super.getAll(clause,columns);
     }
}

export default new VotesModel(table);
