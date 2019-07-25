import Practice from '../models/practice';

const PracticeController = {
    async create(req,res){
        if (!req.body.title && !req.body.description && !req.body.steps) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        req.body.logged_user=req.decoded.id;
        const result =await Practice.create(req.body);
        if(result==='failure'){
            return res.status(400).send({'success':false, 'message':'operation failed'});
        }else{
            return res.status(201).send({'success':true});
        }
    },

    async getAll(req,res){
        const result = await Practice.findAll();
        if(result==='failure')
            return res.status(400).send({success:false, message: 'could not perform action'});
        return res.status(200).send({success:true, Practice:result});
    },

    async getOne(req,res){
        const result = await Practice.findOne(req.params.id);
        if(result==='failure')
            return res.status(404).send({'success':false, 'message':'practice not found'});
        return res.status(200).send({'success':true, 'practice':result});
    },

    async update(req,res){
        const result = await Practice.findOne(req.params.qn_id);
        if(result==='failure')
            return res.status(404).send({'success': false, 'message':'practice not found'});

        else if(req.decoded.id!==result.created_by) //ensure only owner updates
            return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});

        const updateResult = await Practice.update(result,req.body);
        if (updateResult==='failure')
            return res.status(400).send({'success': false,'message':'practice update failed'});
        return res.status(200).send({'success': true,'message':'update successful'});
    },

    async delete(req,res){
        const result = await Practice.findOne(req.params.id);
        if(result==='failure')
            return res.status(404).send({success:false, 'message':'practice not found'});
        else if(req.decoded.id!==result.created_by) //ensure only owner updates
            return res.status(400).send({'success': false, 'message':'you are not authorized to perform this action'});

        const deleteResult = await Practice.delete(req.params.id);
        if (deleteResult==='failure')
            return res.status(400).send({'success': false,'message':'practice deletion failed'});
        return res.status(200).send({success:true, 'message':'practice deleted successfully'});
    }
}
export default PracticeController;
