import moment from 'moment';
import uuid from 'uuid';
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
import QueryBuilder from '../db/queryBuilder';

class Question {

    /***
     * class constructor
     */
    constructor(){
        this.pool=new Pool({connectionString:process.env.DATABASE_URL});
        this.pool.on('connect',()=>{
            console.log('qns connection established');
        });
        this.table = 'questions';
    }

    /***
     *
     * @param data
     * @return {object} question
     */
    create(data){
      const newQuestion = {
          id: uuid.v4(),
          title: data.title || '',
          body: data.body || '',
          created_by: data.logged_user,
          created_at: moment().format('YYYY-MM-DD H:mm')
      };

      const query = QueryBuilder.insert(this.table,newQuestion);
      return this.pool.query(query)
          .then(()=>{
              return newQuestion;
          }).catch(()=>{
              return 'failure';
      })

    }

    /***
     *
     * @param id
     * @return {object} question
     */
    findOne(id){
        const question ={
            id:id
        };
        const query = QueryBuilder.fetch(this.table,'*', question);
        return this.pool.query(query).then((result)=>{
            if(result.rows.length>0)
                return result.rows[0];
            return 'failure';
        }).catch(()=>{
            return 'failure';
        });

    }

    /***
     *
     * @return {Array}
     */
    findAll(){
        const query= QueryBuilder.fetchAll(this.table,'*');
        return this.pool.query(query).then((result)=>{
            return result.rows
        }).catch(()=>{
            return 'failure';
        });
    }

    /***
     *
     * @params id, data
     * @return {object} question
     */
    update(question,data){
        const newQn ={
            title:data.title || question.title,
            body: data.body || question.body,
            updated_at:  moment().format('YYYY-MM-DD H:mm')
        };

        const query = QueryBuilder.update(this.table,newQn,`id='${question.id}'`);
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

    /**
     *
     * @param id
     * @return {{}}
     */
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

export default new Question();