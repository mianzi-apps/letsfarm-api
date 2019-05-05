import express from 'express';
import Question from '../controllers/questions';
let router = express.Router();

router.get('/questions',Question.listAllQuestions);
router.post('/questions',Question.create);
router.put('/questions/:id',Question.update);
router.get('/questions/:id',Question.getQuestion);
router.delete('/questions/:id',Question.delete);

module.exports = router;