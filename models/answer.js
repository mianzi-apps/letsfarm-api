import uuid from 'uuid';
import moment from 'moment';
import QueryBuilder from '../db/queryBuilder';
const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();

class AnswerModel{
    constructor(){
        this.pool = new Pool({connectionString:process.env.DATABASE_URL})
        this.pool.on('connect',()=>{
            console.log('answer model connected to database')
        });

        this.table = 'answers';
    }

    create(qnId, data){
        const newAnswer = {
            id : uuid.v4(),
            body: data.body || '',
            user_id: data.logged_user,
            question_id: qnId,
            created_at: moment().format('YYYY-MM-DD H:mm'),
        };
        const query = QueryBuilder.insert(this.table,newAnswer);
        return this.pool.query(query).then(()=>{
            return newAnswer;
        }).catch(()=>{
            return 'failure';
        })
    }

    findOne(id){
        const newAnswer = {
            id
        };
        const query = QueryBuilder.fetch(this.table,'*', newAnswer);
        return this.pool.query(query).then(result=>{
            if(result.rows.length>0)
                return result.rows[0];
            return 'failure';
        }).catch(()=>{
            return 'failure';
        })
    }

    delete(id){
        const query= QueryBuilder.deleteFromTable(this.table,`id='${id}'`);
        return this.pool.query(query).then(()=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }

    update(oldAnswer,data){
        const newAnswer= {
            body:data.body || oldAnswer.body,
            updated_at: moment().format('YYYY-MM-DD H:mm')
        };
        const query = QueryBuilder.update(this.table,newAnswer,`id='${oldAnswer.id}'`);
        return this.pool.query(query).then(()=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }

    findAll(qnId){
        const query = QueryBuilder.fetchWithClause(this.table,'*',`question_id='${qnId}'`);
        return this.pool.query(query).then((result)=>{
            return result.rows;
        }).catch(()=>{
            return 'failure';
        })
    }
}

export default new AnswerModel();