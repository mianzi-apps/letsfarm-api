const Practice = require('../models').Practice;

const PracticeController = {
    create(req,res){
        if (!req.body.title && !req.body.description && !req.body.step_level) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        req.body.created_by=req.decoded.id;
        Practice.create(req.body).then((project)=>{
            return res.status(201).send({'success':true,project});
        }).catch(()=>{
            return res.status(400).send({'success':false, 'message':'operation failed'});
        });
    },

    getAll(req,res){
        Practice.findAll().then((practices)=>{
            return res.status(200).send({success:true, practices});
        }).catch(()=>{
            return res.status(400).send({success:false, message: 'could not perform action'});
        });
    },

    getOne(req,res){
        Practice.findOne({
            where:{id:req.params.id}
            }).then((practice)=>{
            return res.status(200).send({'success':true,practice });
        }).catch(()=>{
            return res.status(404).send({'success':false, 'message':'practice not found'});
        });
    },

    update(req,res){
        Practice.findOne({
            where:{id:req.params.id}
        }).then((practice)=>{
            practice.update(req.body).then(()=>{
                return res.status(200).send({'success': true,'message':'update successful'});
            })
        }).catch(()=>{
            return res.status(404).send({'success':false, 'message':'practice not found'});
        });
    },

    delete(req,res){
        Practice.findOne({
            where:{id:req.params.id}
        }).then((practice)=>{
            practice.destroy().then(()=>{
                return res.status(200).send({'success': true,'message':'delete successful'});
            })
        }).catch(()=>{
            return res.status(404).send({'success':false, 'message':'practice not found'});
        });
    }
};
export default PracticeController;
