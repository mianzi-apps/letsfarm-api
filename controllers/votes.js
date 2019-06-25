import VotesModel from '../models/votes';
import QuestionModel from "../models/question";

const VotesController = {
    async create(req, res){
        const { id } = req.params;
        if (!('vote' in req.body)) {
            return res.status(400).send({'message': 'vote field required'})
        }
        const result = await QuestionModel.findOne(id);
        if(result==='failure')
            return res.status(404).send({'success':false, 'message':'question not found'});

        req.body.user_id=req.decoded.id;
        req.body.qn_id=id;
        const createVote = await  VotesModel.create(req.body);
        if(createVote==='failure')
            return res.status(400).send({'success':false, 'message':'operation failed'});
        return res.status(200).send({'success':true, 'message':'vote recorded'});
    },

    async getAll(req,res){
        const { id } = req.params;
        const result = await QuestionModel.findOne(id);
        if(result==='failure')
            return res.status(404).send({'success':false, 'message':'question not found'});

        const votes = await VotesModel.getAll(id);
        if(votes==='failure')
            return res.status(400).send({'success':false, 'message':'operation failed'});
        return res.status(200).send({'success':true,'votes':votes});
    }
};

export default VotesController;
