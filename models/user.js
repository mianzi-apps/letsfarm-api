import moment from 'moment';
import uuid from 'uuid';
import QueryBuilder from '../db/queryBuilder';

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

class UserModel{
    constructor(){
        this.pool= new Pool({
            connectionString:process.env.DATABASE_URL
        })
        this.pool.on('connect',()=>{
            console.log('connection established')
        })
    }

    create(data){
        let newUser={
            id :uuid.v4(),
            display_name: data.display_name || '',
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            password: data.password || '',
            auth_token: data.auth_token || '',
            log_type: data.log_type || '',
            role: data.role || '' , 
            created_at: moment().format('YYYY-MM-DD'),
            updated_at: moment().format('YYYY-MM-DD')
        }

        const query = QueryBuilder.insert('users',newUser);
        
        return this.pool.query(query).then(()=>{
            return newUser;
        }).catch(()=>{
            return 'failure';
        })
    }

    login(data){
        let user = {
            email: data.email || '',
            password: data.password|| ''
        }
        
        const query = QueryBuilder.fetch('users','*',user);

        return this.pool.query(query).then((result)=>{
            if(length(result.rows)>0){
                return result.rows[0];
            }else{
                return 'failure';
            }

        }).catch(()=>{
            return 'failure';
        })
    }
}

export default new UserModel();
