import moment from 'moment';
import uuid from 'uuid';
import Model from './genericModel';

class UserModel extends Model{
    constructor(table){
        super(table);
    }

    create(data){
        let newUser={
            id :uuid.v4(),
            display_name: data.display_name || '',
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            password: data.password || '',
            auth_token: data.auth_token || '',
            log_type: data.log_type || '',
            role: data.role || '' ,
            created_at: moment().format('YYYY-MM-DD'),
            updated_at: moment().format('YYYY-MM-DD')
        };

        return super.create(newUser);
    }

    login(data){
        let user = {
            email: data.email || '',
            password: data.password|| ''
        };

        return super.getOne(null,user);
    }
}

export default new UserModel('users');
