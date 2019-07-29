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
        req.body.id = uuid.v4();
        User.create(req.body).then((user)=>{
            const token = generateToken({'id':user.id});
            return res.status(201).send({user,token});
        }).catch(()=>{
            return res.status(400).send({message:'operation failed'});
        })
    },

    login(req, res){
        const {email,password} = req.body;
        User.findOne({
            where:{email,password}
        }).then(user=>{
            const token = generateToken({'id':user.id});
            return res.status(200).send({user,token});
        }).catch(()=>{
            return res.status(404).send({message:'invalid credentials'});
        });
    },

};

export default UserController;
