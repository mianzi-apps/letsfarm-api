import Model from "./genericModel";
import moment from "moment";

class ProjectsModel extends Model{
    constructor(table){
        super(table);
    }

    create(data){
        const newProject ={
            title:data.title,
            image_url:data.image_url||'',
            user_id: data.user_id,
            public: 0,
            created_at:  moment().format('YYYY-MM-DD H:mm')
        };

        return super.create(newProject);
    }

    update(prevProject,data){
        const toSave = {
            title:data.title || prevProject.title,
            image_url:data.image_url || prevProject.image_url,
            updated_at:  moment().format('YYYY-MM-DD H:mm')
        };
        const clause=`id='${prevProject.id}'`;
        return super.update(toSave,clause);
    }

    getAll(id){
        const clause = `user_id='${id}'`;
        return super.getAll(clause,'*');
    }

}

export default new ProjectsModel('projects');
