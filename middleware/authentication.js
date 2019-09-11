let jwt = require('jsonwebtoken');
require('dotenv').config();

let secretKey = process.env.SECRET_KEY;

const generateToken=(payload)=>{
    return jwt.sign(payload,secretKey,{expiresIn:'24h'});
};

const checkToken = (req,res,next) => {
    let token=req.headers['x-access-token'] || req.headers['authorization'];
    if(token && token.startsWith('Bearer ')){
        token = token.slice(7,token.length);
    }

    if(token){
        jwt.verify(token,secretKey,(err,decoded)=>{
            if(err){
                return res.status(400).json({
                    success: false,
                    message: 'token is invalid'
                })
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.status(400).json({
            success: false,
            message: 'auth token not provided'
        })
    }
};

module.exports ={
    checkToken,
    generateToken,
};
