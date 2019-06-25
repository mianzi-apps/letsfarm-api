import  moment from 'moment';
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
            cat_name: data.cat_name,
            cat_parent: data.cat_parent || "",
            created_at: moment.format('YYYY-MM-DD H:mm')
        };

        const query= QueryBuilder.insert(this.table,newCategory);
        return this.pool.query(query).then((res)=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }

    update(oldCat,data){
        const catData={
            cat_name: data.cat_name || oldCat.cat_name,
            cat_parent: data.cat_parent || oldCat.cat_parent,
            updated_at: moment.format('YYYY-MM-DD H:mm')
        };

        const query= QueryBuilder.update(this.table,catData,`id=${oldCat.id}`);
        return this.pool.query(query).then((res)=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }

    getOne(id){
        const query = QueryBuilder.fetch(this.table,'*',{id});
        return this.pool.query(query).then((result)=>{
            if(result.rows.length>0){
                return result.rows[0];
            }
            return 'failure';
        }).catch(()=>{
            return 'failure';
        })
    }

    getAll(){
        const query = QueryBuilder.fetchAll(this.table,'*');
        return this.pool.query(query).then((result)=>{
            return result.rows;
        }).catch(()=>{
            return 'failure';
        })
    }

    delete(id){
        const query = QueryBuilder.deleteFromTable(this.table,`id=${id} or cat_parent=${id}`);
        return this.pool.query(query).then((result)=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }
}

export default new Categories();
