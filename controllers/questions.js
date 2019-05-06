import QuestionModel from '../models/question';

const Question = {
    /**
     * @param req
     * @param res
     * @return {object} question
     */
    create(req,res){
        if (!req.body.title && !req.body.body) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        const question = QuestionModel.create(req.body);
        return res.status(201).send(question);
    },

    /***
     * @param req
     * @param res
     * @return {object} questions
     */
    getAll(req,res){
        const questions = QuestionModel.findAll();
        return res.status(200).send(questions);
    },

    /***
     * @param req
     * @param res
     * @return {object} question
     */
    getOne(req,res){
        const question = QuestionModel.findOne(req.params.id);
        if(!question)
            return res.status(404).send({'message':'question not found'});
        return res.status(200).send(question);
    },

    /***
     * @param res
     * @param req
     * @return {*|void}
     */
    update(res,req){
        const question = QuestionModel.findOne(req.params.id);
        if(!question)
            return res.status(404).send({'message':'question not found'});
        const updateQuestion = QuestionModel.update(req.params.id,req.body);
        return res.status(200).send(updateQuestion);
    },

    /***
     *
     * @param res
     * @param req
     * @return {object}
     */
    delete(res,req){
        const question = QuestionModel.findOne(req.params.id);
        if(!question)
            return res.status(404).send({'message':'question not found'});
        const deleteQuestion = QuestionModel.delete(req.params.id);
        return res.status(200).send(deleteQuestion);
    }

};

export default Question;

