import DiseasesModel from '../modelsp/diseases';
import CategoriesModel from '../modelsp/categories';

const DiseasesController = {
    async create(req,res){
        const {title,description,signs,symptoms,treatment} = req.body;
        if(!title || !description || !signs || !symptoms || !treatment){
            return res.status(400).send({'success':false, message:'title,description,signs,symptoms,treatment fields are required'})
        }
        const {id} = req.params;
        req.body.category_id=id;
        req.body.user_id = req.decoded.id;
        const checkCategory= await CategoriesModel.getOne(id);
        if(checkCategory==='failure'){
            return res.status(400).send({'success':false, message:'specified category not found'})
        }
        const create = await DiseasesModel.create(req.body);
        if(create==='failure'){
            return res.status(400).send({'success':false, message:'operation failed'})
        }
        return res.status(201).send({'success':true})
    },

    async update(req,res){
        const {id} = req.params;
        const checkDisease = await DiseasesModel.getOne(id);
        if(checkDisease==='failure'){
            return res.status(404).send({'success':false,'message':'disease not found'});
        }

        const updateDisease= await DiseasesModel.update(checkDisease,req.body);
        if(updateDisease==='failure'){
            return res.status(400).send({'success':false,'message':'operation failed'});
        }
        return res.status(200).send({'success':true, message:'disease updated'})
    },

    async getOne(req,res){
        const {id} = req.params;
        const checkDisease = await DiseasesModel.getOne(`id='${id}'`);
        if(checkDisease==='failure'){
            return res.status(404).send({'success':false,'message':'disease not found'});
        }
        return res.status(200).send({'success':true,data:checkDisease})
    },

    async delete(req,res){
        const {id} = req.params;
        const checkDisease = await DiseasesModel.getOne(id);
        if(checkDisease==='failure'){
            return res.status(404).send({'success':false,'message':'disease not found'});
        }
        const deleteResult = await DiseasesModel.delete(id);
        if(deleteResult==='failure'){
            return res.status(404).send({'success':false,'message':'operation failed'});
        }
        return res.status(200).send({'success':true, message:'disease deleted'});
    },

   async  getAllCategoryDiseases(req,res){
        const {id} = req.params;
        const checkCategory= await CategoriesModel.getOne(id);
        if(checkCategory==='failure'){
            return res.status(400).send({'success':false, message:'specified category not found'})
        }
        const result = await DiseasesModel.getAllInCategory(id);
        if(result==='failure'){
            return res.status(400).send({'success':false, message:'operation failed'})
        }
        return res.status(200).send({'success':true, data:result});
    },

    async getAll(req,res){
        const result = await DiseasesModel.getAll();
        if(result==='failure'){
            return res.status(404).send({'success':false,'message':'operation failed'});
        }
        return res.status(200).send({'success':true, data:result});
    }

};

export default DiseasesController;
