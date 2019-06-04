import express from 'express';
import Question from '../controllers/questions';
import { checkToken } from '../middleware/authentication';

let router = express.Router();

router.get('/questions',Question.getAll);
router.post('/questions', checkToken, Question.create);
router.put('/questions/:qn_id',checkToken, Question.update);
router.get('/questions/:id',Question.getOne);
router.delete('/questions/:id',checkToken, Question.delete);

module.exports = router;