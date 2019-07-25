import ProjectsModel from '../modelsp/projects';
import UserModel from "../modelsp/user";

const ProjectController = {
    async create(req,res){
        const {title} = req.body;
        if(!title){
            return res.status(400).send({success:false, message:'title is required'});
        }
        req.body.user_id = req.decoded.id;
        const create = await ProjectsModel.create(req.body);
        if(create==='failure')
            return res.status(400).send({success:false, message:'creation failed'});
        return res.status(201).send({success:true, message:'project created', data:create});
    },
    async update(req,res){
        const {id} = req.params;
        const check = await ProjectsModel.getOne(id);
        if(check==='failure')
            return res.status(404).send({success:false, message:'project not found'});
        const update = await ProjectsModel.update(check,req.body);
        if(update==='failure')
            return res.status(404).send({success:false, message:'could not update'});
        return res.status(200).send({success:true, message:'project updated'});
    },

    async delete(req,res){
        const {id} = req.params;
        const check = await ProjectsModel.getOne(id);
        if(check==='failure')
            return res.status(404).send({success:false, message:'project not found'});
        const result = await ProjectsModel.delete(id);
        if(result==='failure')
            return res.status(404).send({success:false, message:'could not delete'});
        return res.status(200).send({success:true, message:'project deleted'});
    },

    async getProject(req,res){
        const {id} = req.params;
        const check = await ProjectsModel.getOne(id);
        if(check==='failure')
            return res.status(404).send({success:false, message:'project not found'});
        return res.status(200).send({success:true, data:check});
    },

    async getUserProjects(req,res){
        const {id} = req.params;
        const check = await UserModel.getOne(id);
        if(check==='failure')
            return res.status(404).send({success:false, message:'user not found'});
        const projects = await ProjectsModel.getAll(id);
        if(projects==='failure')
            return res.status(400).send({success:false, message:'operation failed'});
        return res.status(200).send({success:true, data:projects});
    },

};

export default ProjectController;
