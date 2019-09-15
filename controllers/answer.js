const Answer = require('../models').Answer;
const Question = require('../models').Question;
const User = require('../models').User;
const AnswerController ={

    create(req,res){
        if (!req.body.body) {
            return res.status(400).send({'message': 'body field is required'})
        }
        const { id }  = req.params;
        if(!id){
            return res.status(400).send({'message': 'question being answered is required in the params'})
        }
        req.body.question_id = id;
        req.body.created_by= req.decoded.id;
        Question.findOne({
            where:{id}
        }).then(()=>{
            Answer.create(req.body).then((answer)=>{
                return res.status(201).send({success:true, 'message': 'answer saved',answer })
            }).catch(()=>{
                return res.status(404).send({success:false, 'message': 'operation failed'});
            });
        }).catch(()=>{
            return res.status(404).send({success:false, 'message': 'target question not found'});
        });
    },

    getOne(req, res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target answer identifier is required in the params'})
        }

        Answer.findOne({
            where:{id},
            include:[{model:Question, as:'question'}]
        }).then((answer)=>{
           return res.status(200).send({success:true, answer })
        }).catch(()=>{
            return res.status(404).send({success:false, 'message': 'target question not found'});
        });
    },

    update(req, res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target answer identifier is required in the params'})
        }

        Answer.findOne({
            where:{id},
            include:[{model:Question, as:'question'}]
        }).then((answer)=>{
            if(answer.created_by===req.decoded.id){
                answer.update(req.body).then((new_answer)=>{
                    return res.status(200).send({success:true, new_answer })
                }).catch(()=>{
                    return res.status(400).send({success:false, message:"update failed"});
                })
            }else{
                return res.status(400).send({success:false, message:"you are not authorised to perform this operation"});
            }

        }).catch(()=>{
            return res.status(404).send({success:false, 'message': 'target answer not found'});
        });
    },

    delete(req, res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target answer identifier is required in the params'})
        }
        Answer.findOne({
            where:{id},
            include:[{model:Question, as:'question'}]
        }).then((answer)=>{
            if(answer.created_by===req.decoded.id){
                answer.destroy().then(()=>{
                    return res.status(200).send({success:true, message:'answer deleted' })
                }).catch(()=>{
                    return res.status(400).send({success:false, message:"delete failed"});
                })
            }else{
                return res.status(400).send({success:false, message:"you are not authorised to perform this operation"});
            }
        }).catch(()=>{
            return res.status(404).send({success:false, 'message': 'target answer not found'});
        });
    },

    getAll(req,res){
        const { id } = req.params;
        if(!id){
            return res.status(400).send({'message': 'target question identifier is required in the params'})
        }
        Answer.findAll({
            where:{question_id:id},
            include:[{model:User, as:'owner'}]
        }).then((answers)=>{
            return res.status(201).send({success:true, answers})
        }).catch(()=>{
            return res.status(404).send({success:false, 'message': 'target question not found'});
        });
    },

};

export default AnswerController;
