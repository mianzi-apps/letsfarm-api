import moment from 'moment';
import uuid from 'uuid';

class Question {

    /***
     * class constructor
     */
    constructor(){
        this.questions=[];
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
          created_at: moment.now(),
          updated_at: moment.now()
      };
      this.questions.push(newQuestion);
      return newQuestion;
    }

    /***
     *
     * @param id
     * @return {object} question
     */
    findOne(id){
        return this.questions.find(question=>question.id===id);
    }

    /***
     *
     * @return {Array}
     */
    findAll(){
        return this.questions;
    }

    /***
     *
     * @params id, data
     * @return {object} question
     */
    update(id,data){
        const question= this.findOne(id);
        const index = this.questions.indexOf(question);
        this.questions[index].title= data.title || question.title;
        this.questions[index].body= data.body || question.body;
        this.questions[index].updated_at= moment.now();

        return this.questions[index];
    }

    /**
     *
     * @param id
     * @return {{}}
     */
    delete(id){
        const question = this.findOne(id);
        const index = this.questions.indexOf(question);
        this.questions.splice(index,1);
        return {}
    }
}

export default new Question();