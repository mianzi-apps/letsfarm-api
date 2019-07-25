import CategoriesModel from '../modelsp/categories';

const CategoriesController = {
    async create(req,res){
        if(!('cat_name' in req.body) || !req.body.cat_name){
            return res.status(400).send({'success':false,'message':'cat_name field is required'});
        }
        const insertResult = await CategoriesModel.create(req.body);

        if(insertResult==='failure'){
            return res.status(400).send({'success':false,'message':'operation failed'});
        }
        return res.status(200).send({'success':true, message:'category created'});
    },

    async update(req,res){
        const {id} = req.params;
        if(!id){
            return res.status(400).send({'success':false,'message':'id param is required'});
        } else if(!('cat_name' in req.body) || !req.body.cat_name){
            return res.status(400).send({'success':false,'message':'cat_name field is required'});
        }

        const checkCat = await CategoriesModel.getOne(id);
        if(checkCat==='failure'){
            return res.status(404).send({'success':false,'message':'category not found'});
        }

        const updateCat = await CategoriesModel.update(checkCat,req.body);
        if(updateCat==='failure'){
            return res.status(404).send({'success':false,'message':'category not found'});
        }
        return res.status(200).send({'success':true, message: 'category updated'});
    },

    async delete(req,res){
        const {id} = req.params;
        if(!id){
            return res.status(400).send({'success':false,'message':'id param is required'});
        }
        const checkCat = await CategoriesModel.getOne(id);
        if(checkCat==='failure'){
            return res.status(404).send({'success':false,'message':'category not found'});
        }

        const deleteCat = await CategoriesModel.delete(id);
        if(deleteCat==='failure'){
            return res.status(404).send({'success':false,'message':'category not found'});
        }
        return res.status(200).send({'success':true, message: 'category deleted'});
    },

    async get(req,res){
        const {id} = req.params;
        if(!id){
            return res.status(400).send({'success':false,'message':'id param is required'});
        }
        const checkCat = await CategoriesModel.getOne(id);
        if(checkCat==='failure'){
            return res.status(404).send({'success':false,'message':'category not found'});
        }
        return res.status(200).send({'success':true, data: checkCat});
    },

    async getAll(req,res){
        const checkCategories = await CategoriesModel.getAll();
        if(checkCategories==='failure'){
            return res.status(404).send({'success':false,'message':'category not found'});
        }
        return res.status(200).send({'success':true, data:checkCategories});
    }
};

export default CategoriesController;
