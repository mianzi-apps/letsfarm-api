import AnswerModel from '../models/answer';
import QuestionModel from '../models/question';

const AnswerController ={

    async create(req,res){
        if (!req.body.body) {
            return res.status(400).send({'message': 'body field is required'})
        }
        const { qn_id }  = req.params;
        if(!qn_id){
            return res.status(400).send({'message': 'question being answered is required in the params'})
        }
        const qnResult = await QuestionModel.findOne(qn_id);
        if(qnResult==='failure')
            return res.status(404).send({success:false, 'message': 'target question not found'});
        req.body.logged_user=req.decoded.id;

        const answerResult = await AnswerModel.create(qn_id, req.body);
        if(answerResult==='failure')
            return res.status(404).send({success:false, 'message': 'target question not found'});
        return res.status(201).send({success:true, 'message': 'answer saved'})
    },

    async getOne(req, res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target answer identifier is required in the params'})
        }

        const ansResult = await AnswerModel.getOne(id);
        if(ansResult==='failure')
            return res.status(404).send({success:false, 'message': 'target answer not found'});
        return res.status(200).send({success:true, answer: ansResult});
    },

    async update(req, res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target answer identifier is required in the params'})
        }
        const ansResult = await AnswerModel.getOne(id);
        if(ansResult==='failure')
            return res.status(404).send({success:false, 'message': 'target answer not found'});

        else if(req.decoded.id!==ansResult.user_id) //ensure only owner updates
            return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});

        const updateResult= await AnswerModel.update(ansResult,req.body);
        if(updateResult==='failure')
            return res.status(400).send({'message': 'target answer not updated'});
        return res.status(200).send({success:true, 'message': 'answer updated successfully'});
    },

    async delete(req, res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target answer identifier is required in the params'})
        }
        const result = await AnswerModel.getOne(id);
        if(result==='failure')
            return res.status(404).send({success:false, 'message':'answer not found'});
        else if(req.decoded.id!==result.user_id)
            return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});

        const ansResult = await AnswerModel.delete(id);
        if(ansResult==='failure')
            return res.status(404).send({success:false, message: 'target answer not deleted'});
        return res.status(200).send({success:true, message: 'answer deleted successfully'});
    },

    async getAll(req,res){
        const { qn_id } = req.params;
        if(!qn_id){
            return res.status(400).send({'message': 'target question identifier is required in the params'})
        }

        const result = await QuestionModel.findOne(qn_id);
        if(result==='failure')
            return res.status(404).send({success:false, 'message':'question not found'});

        const allAnswersResult = await AnswerModel.findAll(qn_id);
        if(allAnswersResult==='failure')
            return res.status(400).send({success:false, 'message':'failed to perform operation'});
        return res.status(200).send({success:true, data:{question: result, answers: allAnswersResult}});
    },

};

export default AnswerController;
