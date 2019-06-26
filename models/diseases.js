import uuid from 'uuid';
import moment from 'moment';
import QueryBuilder from "../db/queryBuilder";
const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

class DiseaseModel{
    constructor(){
        this.table='diseases';
        this.pool = new Pool({connectionString:process.env.DATABASE_URL});
        this.pool.on('connect',()=>{
            console.log('diseases model connected')
        })
    }

    create(data){
        const newDisease = {
            id: uuid.v4(),
            title: data.title,
            description: data.description,
            signs: data.signs,
            symptoms: data.symptoms,
            treatment:data.treatment,
            category_id:data.category,
            created_by: data.user_id,
            created_at: moment().format('YYYY-MM-DD H:mm'),
        };

        const query = QueryBuilder.insert(this.table,newDisease);
        return this.pool.query(query)
            .then(()=>{
                return newDisease;
            }).catch(()=>{
                return 'failure';
            })
    }

    update(oldDisease,data){
        const updatedDisease = {
            title: data.title || oldDisease.title,
            description: data.description || oldDisease.description,
            signs: data.signs || oldDisease.signs,
            symptoms: data.symptoms || oldDisease.symptoms,
            treatment:data.treatment || oldDisease.treatment,
            category_id:data.category || oldDisease.category,
            updated_at: moment().format('YYYY-MM-DD H:mm'),
        };

        const query = QueryBuilder.update(this.table,updatedDisease,`id='${oldDisease.id}'`);
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

    delete(id){
        const query = QueryBuilder.deleteFromTable(this.table,`id=${id}`);
        return this.pool.query(query).then((result)=>{
            return 'success';
        }).catch(()=>{
            return 'failure';
        })
    }

    getAll(catId){
        const query = QueryBuilder.fetchWithClause(this.table,'*',`category_id='${catId}'`);
        return this.pool.query(query).then((result)=>{
            return result.rows;
        }).catch(()=>{
            return 'failure';
        })
    }

    getAllDiseases(){
        const query = QueryBuilder.fetchAll(this.table,'*');
        return this.pool.query(query).then((result)=>{
            return result.rows;
        }).catch(()=>{
            return 'failure';
        })
    }

}

export default new DiseaseModel();
