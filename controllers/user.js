import uuid from "uuid";
const User = require('../models').User;
import { generateToken } from '../middleware/authentication';

const UserController={

    /**
     * @param req
     * @param res
     * @return {object} user
     */
    create(req, res){
        if (!req.body.display_name && !req.body.name) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        User.create({...req.body,id :uuid.v4()}).then((user)=>{
            return res.status(201).send(user);
        }).catch(()=>{
            return res.status(400).send({message:'operation failed'});
        })
    },

    login(req, res){
        const {email,password} = req.body;
        User.findOne({
            where:{email,password}
        }).then((user)=>{
            user.token = generateToken({'id':user.id});
            return res.status(201).send(user);
        }).catch(()=>{
            return res.status(404).send({message:'invalid credentials'});
        });
    },

};

export default UserController;
