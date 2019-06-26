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

    }

    update(oldDisease,newDisease){

    }

    getOne(id){

    }

    delete(id){

    }

    getAll(catId){

    }

}

export default new DiseaseModel();
