import questions from '../db/db';

module.exports = class Question {
    static listAllQuestions(req, res) {
        res.json(questions);
    };

    static getQuestion(req,res){
        const id= req.params.id;
        questions.forEach((item)=>{
            if(item.id===id){
                console.log(item.id);
                return res.status(200).json({item,})
            }
        });
    }
};




