import uuid from "uuid";
const Project = require('../models').Project;
const User = require('../models').User;

const ProjectController = {
    create(req,res){
        const {title} = req.body;
        if(!title){
            return res.status(400).send({success:false, message:'title is required'});
        }
        req.body.created_by = req.decoded.id;
        req.body.id = uuid.v4();
        Project.create(req.body).then((project)=>{
            return res.status(201).send({success:true, message:'project created', project});
        }).catch(()=>{
            return res.status(400).send({success:false, message:'creation failed'});
        });
    },

    update(req,res){
        const {id} = req.params;
        Project.findOne({
            where:{id},
            include:[{model:User, as:'owner'}]
        }).then((project)=>{
            if(project.owner.id=req.decoded.id){
                project.update(req.body).then(()=>{
                    return res.status(200).send({success:true, message:'project updated'});
                })
            }else{
                return res.status(400).send({success:false, message:'you are not authorized to perform this operation'});
            }
        }).catch(()=>{
            return res.status(404).send({success:false, message:'project not found'});
        });
    },

    delete(req,res){
        const {id} = req.params;
        Project.findOne({
            where:{id},
            include:[{model:User, as:'owner'}]
        }).then((project)=>{
            if(project.owner.id=req.decoded.id){
                project.destroy().then(()=>{
                    return res.status(200).send({success:true, message:'project deleted'});
                })
            }else{
                return res.status(400).send({success:false, message:'you are not authorized to perform this operation'});
            }
        }).catch(()=>{
            return res.status(404).send({success:false, message:'project not found'});
        });
    },

    getProject(req,res){
        const {id} = req.params;
        Project.findOne({
            where:{id},
            include:[{model:User, as:'owner'}]
        }).then((project)=>{
            return res.status(200).send({success:true, project});
        }).catch(()=>{
            return res.status(404).send({success:false, message:'project not found'});
        });
    },

    getUserProjects(req,res){
        const {id} = req.params;
        User.findOne({
            where:{id},
            include:[{model:Project, as:'projects'}]
        }).then((data)=>{
            return res.status(200).send({success:true, data});
        }).catch(()=>{
            return res.status(404).send({success:false, message:'user not found'});
        });
    },

};

export default ProjectController;
