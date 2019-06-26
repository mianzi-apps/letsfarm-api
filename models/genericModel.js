import QueryBuilder from "../db/queryBuilder";
const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

class Model {
    constructor(table){
        this.table=table;
        this.pool = new Pool({connectionString:process.env.DATABASE_URL});
        this.pool.on('connect',()=>{
            console.log('db connected')
        })
    }

    create(data){
        const query = QueryBuilder.insert(this.table,data);
        return this.pool.query(query)
            .then(()=>{
                return data;
            }).catch(()=>{
                return 'failure';
            })
    }

    update(data,whereClause){
        const query = QueryBuilder.update(this.table,data,whereClause);
        return this.pool.query(query)
            .then(()=>{
                return "success";
            }).catch(()=>{
                return 'failure';
            })
    }

    getOne(id){
        const query = QueryBuilder.fetchWithClause(this.table,'*',`id='${id}'`);
        return this.pool.query(query).then((result)=>{
            if(result.rows.length>0){
                return result.rows[0];
            }
            return 'failure';
        }).catch(()=>{
            return 'failure';
        })
    }

    delete(id=null,clause=null){
        let query;
        if(clause){
            query = QueryBuilder.deleteFromTable(this.table,clause);
        }else{
            query = QueryBuilder.deleteFromTable(this.table,`id='${id}'`);
        }
        return this.pool.query(query).then((result)=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }

    getAll(clause=null){
        let query;
        if(clause){
            query = QueryBuilder.fetchWithClause(this.table,'*',clause);
        }else{
            query = QueryBuilder.fetchAll(this.table,'*');
        }

        return this.pool.query(query).then((result)=>{
            return result.rows;
        }).catch(()=>{
            return 'failure';
        })
    }

}

export default Model;
