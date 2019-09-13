const Disease = require('../models').Disease;
const Category = require('../models').Category;

const DiseasesController = {
    create(req,res){
        const {title,description,signs,symptoms,treatment} = req.body;
        if(!title || !description || !signs || !symptoms || !treatment){
            return res.status(400).send({'success':false, message:'title,description,signs,symptoms,treatment fields are required'})
        }
        const {id} = req.params;
        req.body.category_id=id;
        req.body.created_by = req.decoded.id;
        Category.findOne({
            where:{id}
            }).then(()=> {
                Disease.create(req.body).then((disease)=>{
                    return res.status(201).send({'success':true, disease})
                })
            }).catch(()=>{
            return res.status(404).send({'success':false, message:'specified category not found'})
        });
    },

    update(req,res){
        const {id} = req.params;
        Disease.findOne({
            where:{id}
        }).then((disease)=> {
            disease.update(req.body).then((disease_new)=>{
                return res.status(200).send({'success':true, message:'disease updated', disease_new})
            })
        }).catch(()=>{
            return res.status(400).send({'success':false, message:'specified disease not found'})
        });
    },

    getOne(req,res){
        const {id} = req.params;
        Disease.findOne({
            where:{id}
        }).then((disease)=> {
            return res.status(200).send({'success':true, disease})
        }).catch(()=>{
            return res.status(400).send({'success':false, message:'specified disease not found'})
        });
    },

    delete(req,res){
        const {id} = req.params;
        Disease.findOne({
            where:{id}
        }).then((disease)=> {
            disease.destroy().then(()=>{
                return res.status(200).send({'success':true, message:'disease deleted'})
            })
        }).catch(()=>{
            return res.status(400).send({'success':false, message:'specified disease not found'})
        });
    },

    getAllCategoryDiseases(req,res){
        const {id} = req.params;
        Category.findOne({
            where:{id},
            include:[{model:Disease, as:'diseases'}]
        }).then((category)=> {
            return res.status(201).send({'success':true, category});
        }).catch(()=>{
            return res.status(404).send({'success':false, message:'specified category not found'})
        });
    },

    getAll(req,res){
        Disease.findAll({
            include:[{model:Category, as:'category'}]
        }).then((diseases)=> {
            return res.status(201).send({'success':true, diseases});
        }).catch(()=>{
            return res.status(400).send({'success':false, message:'operation failed'})
        });
    }

};

export default DiseasesController;
