import  moment from 'moment';
import Model from './genericModel';

class Categories extends Model{
    constructor(table){
        super(table);
    }

    create(data){
        const newCategory={
            cat_name: data.cat_name,
            cat_parent: data.cat_parent || 0,
            created_at: moment().format('YYYY-MM-DD H:mm')
        };
        
        return super.create(newCategory);
    }

    update(oldCat,data){
        const catData={
            cat_name: data.cat_name || oldCat.cat_name,
            cat_parent: data.cat_parent || oldCat.cat_parent,
            updated_at: moment().format('YYYY-MM-DD H:mm')
        };
        const clause = `id=${oldCat.id}`;
        return super.update(catData,clause);
    }

    delete(id){
        const clause = `id=${id} or cat_parent=${id}`;
        return super.delete('',clause);
    }
}

export default new Categories('categories');
