const Category = require('../models').Category;
const Disease = require('../models').Disease;
const Practice = require('../models').Practice;

const CategoriesController = {
    create(req,res){
        if(!('name' in req.body) || !req.body.name){
            return res.status(400).send({'success':false,'message':'name field is required'});
        }

        Category.create(req.body).then((category)=>{
            return res.status(200).send({'success':true, message:'category created', category});
        }).catch(()=>{
            return res.status(400).send({'success':false,'message':'operation failed'});
        });
    },

    update(req,res){
        const {id} = req.params;
        if(!id){
            return res.status(400).send({'success':false,'message':'id param is required'});
        } else if(!('name' in req.body) || !req.body.name){
            return res.status(400).send({'success':false,'message':'name field is required'});
        }
        Category.findOne({
            where:{id}
        }).then((category)=>{
            category.update(req.body).then((new_category)=>{
                return res.status(200).send({'success':true, message:'category updated', new_category});
            })
        }).catch(()=>{
            return res.status(404).send({'success':false,'message':'category not found'});
        });

    },

    delete(req,res){
        const {id} = req.params;
        if(!id){
            return res.status(400).send({'success':false,'message':'id param is required'});
        }
        Category.findOne({
            where:{id}
        }).then((category)=>{
            category.destroy().then(()=>{
                return res.status(200).send({'success':true, message:'category deleted'});
            })
        }).catch(()=>{
            return res.status(404).send({'success':false,'message':'category not found'});
        });
    },

    get(req,res){
        const {id} = req.params;
        if(!id){
            return res.status(400).send({'success':false,'message':'id param is required'});
        }
        Category.findOne({
            where:{id}
        }).then((category)=>{
            return res.status(200).send({'success':true, category});
        }).catch(()=>{
            return res.status(404).send({'success':false,'message':'category not found'});
        });
    },

    getAll(req,res){
        Category.findAll({
            include:[{model:Disease, as:'diseases'}, {model:Practice, as:'practices'}]
        }).then((categories)=>{
            return res.status(200).send({'success':true, categories});
        }).catch((err)=>{
            return res.status(400).send({'success':false,'message':'operation failed'+err});
        });
    }
};

export default CategoriesController;
