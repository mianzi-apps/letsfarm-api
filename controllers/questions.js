import uuid from "uuid";
const Question = require('../models').Question;
const User = require('../models').User;

const QuestionController = {
    /**
     * @param req
     * @param res
     * @return {object} question
     */
    create(req,res){
        if (!req.body.title && !req.body.body) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        req.body.created_by=req.decoded.id;
        req.body.id = uuid.v4();
        Question.create(req.body).then((question)=>{
            return res.status(201).send({'success':true,question});
        }).catch(()=>{
            return res.status(400).send({'success':false, 'message':'operation failed'});
        });
    },

    /***
     * @param req
     * @param res
     * @return {object} questions
     */
    getAll(req,res){
        Question.findAll({
            include:[{ model: User, as: 'owner' }]
        }).then((questions)=>{
            return res.status(200).send({success:true, questions});
        }).catch(()=>{
            return res.status(400).send({success:false, message: 'could not perform action'});
        });
    },

    /***
     * @param req
     * @param res
     * @return {object} question
     */
    getOne(req,res){
        Question.findOne({
                where: {id: req.params.id},
                include:[{ model: User, as: 'owner' }]
            }).then((question)=>{
            return res.status(200).send({'success':true, question});
        }).then(()=>{
            return res.status(404).send({'success':false, 'message':'question not found'});
        });
    },

    /***
     * @param res
     * @param req
     * @return {*|void}
     */
    update(req,res){
        Question.findOne({
            where: {id: req.params.id},
            include:[{ model: User, as: 'owner' }]
        }).then((question)=>{
            if(req.decoded.id!==question.owner.id) //ensure only owner updates
                return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});
            else{
                return question.update(req.body).then(()=>{
                    return res.status(200).send({'success': true,'message':'update successfully'});
                })
            }
        }).then(()=>{
            return res.status(404).send({'success':false, 'message':'question not found'});
        });

    },

    /***
     *
     * @param res
     * @param req
     * @return {object}
     */
    delete(req,res){
        Question.findOne({
            where: {id: req.params.id},
            include:[{ model: User, as: 'owner' }]
        }).then((question)=>{
            if(req.decoded.id!==question.owner.id) //ensure only owner updates
                return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});
            else{
                return question.destroy().then(()=>{
                    return res.status(200).send({'success': true,'message':'question deleted successfully'});
                })
            }
        }).then(()=>{
            return res.status(404).send({'success':false, 'message':'question not found'});
        });
    }

};

export default QuestionController;

