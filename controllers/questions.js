import QuestionModel from '../models/question';

const Question = {
    /**
     * @param req
     * @param res
     * @return {object} question
     */
    async create(req,res){
        if (!req.body.title && !req.body.body) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        req.body.logged_user=req.decoded.id;
        const result =await QuestionModel.create(req.body);
        if(result==='failure'){
            return res.status(400).send({'success':false, 'message':'operation failed'});
        }else{
            return res.status(201).send({'success':true});
        }

    },

    /***
     * @param req
     * @param res
     * @return {object} questions
     */
    async getAll(req,res){
        const result = await QuestionModel.getAll();
        if(result==='failure')
            return res.status(400).send({success:false, message: 'could not perform action'});
        return res.status(200).send({success:true, questions:result});
    },

    /***
     * @param req
     * @param res
     * @return {object} question
     */
    async getOne(req,res){
        const result = await QuestionModel.getOne(req.params.id);
        if(result==='failure')
            return res.status(404).send({'success':false, 'message':'question not found'});
        return res.status(200).send({'success':true, 'question':result});
    },

    /***
     * @param res
     * @param req
     * @return {*|void}
     */
    async update(req,res){
        const result = await QuestionModel.getOne(req.params.qn_id);
        if(result==='failure')
            return res.status(404).send({'success': false, 'message':'question not found'});

        else if(req.decoded.id!==result.created_by) //ensure only owner updates
            return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});

        const updateResult = await QuestionModel.update(result,req.body);
        if (updateResult==='failure')
            return res.status(400).send({'success': false,'message':'question update failed'});
        return res.status(200).send({'success': true,'message':'update successful'});
    },

    /***
     *
     * @param res
     * @param req
     * @return {object}
     */
    async delete(req,res){
        const result = await QuestionModel.getOne(req.params.id);
        if(result==='failure')
            return res.status(404).send({success:false, 'message':'question not found'});
        else if(req.decoded.id!==result.created_by) //ensure only owner updates
            return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});

        const deleteResult = await QuestionModel.delete(req.params.id);
        if (deleteResult==='failure')
            return res.status(400).send({'success': false,'message':'question deletion failed'});
        return res.status(200).send({success:true, 'message':'question deleted successfully'});
    }

};

export default Question;

