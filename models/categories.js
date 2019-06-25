import  moment from 'moment';
import uuid from 'uuid';
const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();
import QueryBuilder from '../db/queryBuilder';

class Categories{
    constructor(){
        this.table='categories';
        this.pool = new Pool({connectionString:process.env.DATABASE_URL});
        this.pool.on('connect',()=>{
            console.log('categories connection established');
        })
    }

    create(data){
        const newCategory={

        }
    }

    update(id,data){

    }

    getOne(id){

    }

    getAll(){

    }

    delete(id){

    }
}

export default new Categories();
