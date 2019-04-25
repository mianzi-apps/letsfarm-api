import express from 'express';
import Question from '../controllers/questions';
let router = express.Router();

router.get('/questions',Question.listAllQuestions);
router.get('/questions/:id',Question.getQuestion);

module.exports = router;