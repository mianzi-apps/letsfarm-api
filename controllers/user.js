import UserModel from '../modelsp/user';
import { generateToken } from '../middleware/authentication';

const UserController={

    /**
     * @param req
     * @param res
     * @return {object} user
     */
    async create(req, res){
        // if (!req.body.display_name && !req.body.name) {
        //     return res.status(400).send({'message': 'All fields are required'})
        // }
        const result = await UserModel.create(req.body);
        if (result==='failure'){
            return res.status(400).send({message:'operation failed'});
        }else{
            result.token = generateToken({'id':result.id});
            return res.status(201).send(result);
        }

    },

    async login(req, res){
        const result = await UserModel.login(req.body);
        console.log(result);
        if (result==='failure'){
            return res.status(404).send({message:'invalid credentials'});
        }else{
            result.token = generateToken({'id':result.id});
            return res.status(201).send(result);
        }
    },

    mndjkFn(req, res) {
        return res.status(200).send({success:'yes you did it'});
    },

};

export default UserController;
