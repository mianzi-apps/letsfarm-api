import uuid from 'uuid';
import moment from 'moment';
import QueryBuilder from '../db/queryBuilder';
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

class Practice{
    constructor(){
        this.pool=new Pool({connectionString:process.env.DATABASE_URL});
        this.pool.on('connect',()=>{
            console.log('practices connection established');
        });
        this.table = 'practices';
    }

    create(data){
        const newPractice = {
            id: uuid.v4(),
            title: data.title || '',
            description: data.description || '',
            steps: data.steps || '',
            created_by: data.logged_user,
            created_at: moment().format('YYYY-MM-DD H:mm'),
            updated_at: moment().format('YYYY-MM-DD H:mm')
        };
        const query = QueryBuilder.insert(this.table,newPractice);
        return this.pool.query(query)
            .then(()=>{
                return newPractice;
            }).catch(()=>{
                return 'failure';
        })
    }

    findOne(id){
        const practice ={
            id:id
        };
        const query = QueryBuilder.fetch(this.table,'*', practice);
        return this.pool.query(query).then((result)=>{
            if(result.rows.length>0)
                return result.rows[0];
            return 'failure';
        }).catch(()=>{
            return 'failure';
        });
    }

    findAll(){
        const query= QueryBuilder.fetchAll(this.table,'*');
        return this.pool.query(query).then((result)=>{
            return result.rows
        }).catch(()=>{
            return 'failure';
        });
    }

    update(practice,data){
        const newPractice ={
            title: data.title || practice.title,
            description: data.description || practice.description,
            steps: data.steps || practice.steps,
            updated_at:  moment().format('YYYY-MM-DD H:mm')
        };
        const query = QueryBuilder.update(this.table,newPractice,`id='${question.id}'`);
        return this.pool.query(query).then((result)=>{
            if(result.rowCount>0){
                return 'success';
            }else {
                return 'failure';
            }
        }).catch(()=>{
            return 'failure';
        });
    }

    delete(id){
        const query = QueryBuilder.deleteFromTable(this.table,`id='${id}'`);
        return this.pool.query(query).then((result)=>{
            if(result.rowCount>0){
                return 'success';
            }else {
                return 'failure';
            }
        }).catch(()=>{
            return 'failure';
        });
    }
}
export default new Practice();
