import moment from 'moment';
import uuid from 'uuid';
import Model from './genericModel';

class Question extends Model{

    constructor(table){
        super(table);
    }

    /***
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

      return super.create(newQuestion);
    }

    /***
     * @params id, data
     * @return {object} question
     */
    update(question,data){
        const newQn ={
            title:data.title || question.title,
            body: data.body || question.body,
            updated_at:  moment().format('YYYY-MM-DD H:mm')
        };

        const clause = `id='${question.id}'`;
        return super.update(newQn,clause);
    }

}

export default new Question('questions');
