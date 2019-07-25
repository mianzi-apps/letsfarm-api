import uuid from 'uuid';
import moment from 'moment';
import Model from './genericModel';
const table ='diseases';
class DiseaseModel extends Model{
    constructor(table){
        super(table);
    }

    create(data){
        const newDisease = {
            id: uuid.v4(),
            title: data.title,
            description: data.description,
            signs: data.signs,
            symptoms: data.symptoms,
            treatment: data.treatment,
            category_id: data.category_id,
            created_by: data.user_id,
            created_at: moment().format('YYYY-MM-DD H:mm'),
        };

        return super.create(newDisease);
    }

    update(oldDisease,data){
        const updatedDisease = {
            title: data.title || oldDisease.title,
            description: data.description || oldDisease.description,
            signs: data.signs || oldDisease.signs,
            symptoms: data.symptoms || oldDisease.symptoms,
            treatment: data.treatment || oldDisease.treatment,
            category_id: data.category_id || oldDisease.category_id,
            updated_at: moment().format('YYYY-MM-DD H:mm'),
        };
        const clause=`id='${oldDisease.id}'`;

        return super.update(updatedDisease,clause);
    }

    getAllInCategory(catId){
        const clause=`category_id='${catId}'`;
        return super.getAll(clause);
    }

}

export default new DiseaseModel(table);
