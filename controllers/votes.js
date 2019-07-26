const Vote = require('../models').Vote;
const Question = require('../models').Question;
const sequelize = require('../models').sequelize;

const VotesController = {
    create(req, res){
        const { id } = req.params;
        if (!('vote_type' in req.body)) {
            return res.status(400).send({'message': 'vote field required'})
        }
        Question.findOne({
            where: {id},
        }).then((question)=>{
            req.body.created_by=req.decoded.id;
            req.body.question_id=question.id;
            return Vote.create(req.body).then(()=>{
                return res.status(200).send({'success':true, 'message':'vote recorded'});
            })
        }).then(()=>{
            return res.status(404).send({'success':false, 'message':'question not found'});
        });

    },

    getAll(req,res){
        const { id } = req.params;

        Question.findOne({
            where: {id},
        }).then(()=>{
            return Vote.count({
                where: {question_id:id, vote_type:true},
            }).then((trueVotes)=>{
                return Vote.count({
                    where: {question_id:id, vote_type:false},
                }).then((falseVotes)=> {
                    return res.status(200).send({'success':true, up_votes:trueVotes, down_votes:falseVotes});
                });
            })
        }).then(()=>{
            return res.status(404).send({'success':false, 'message':'question not found'});
        });
    }
};

export default VotesController;
