import express from 'express';
import AnswerController from '../controllers/answer';
import { checkToken } from '../middleware/authentication';

let router = express.Router();

router.post('/answers/:id', checkToken, AnswerController.create);
router.get('/answers/:id',AnswerController.getAll);
router.put('/answers/:id',checkToken, AnswerController.update);
router.get('/answers/:id/details',AnswerController.getOne);
router.delete('/answers/:id',checkToken, AnswerController.delete);

module.exports = router;
