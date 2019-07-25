import uuid from 'uuid';
import moment from 'moment';
import Model from './genericModel';

class AnswerModel extends Model{
    constructor(table){
        super(table);
    }

    create(qnId, data){
        const newAnswer = {
            id : uuid.v4(),
            body: data.body || '',
            user_id: data.logged_user,
            question_id: qnId,
            created_at: moment().format('YYYY-MM-DD H:mm'),
        };
        return super.create(newAnswer);
    }

    update(oldAnswer,data){
        const newAnswer= {
            body:data.body || oldAnswer.body,
            updated_at: moment().format('YYYY-MM-DD H:mm')
        };
        const clause=`id='${oldAnswer.id}'`;
        return super.update(newAnswer,clause);
    }

    findAll(qnId){
        const clause=`question_id='${qnId}'`;
        return super.getAll(clause);
    }
}

export default new AnswerModel('answers');
