import express from 'express';
import PracticeController from '../controllers/practice';
import { checkToken } from '../middleware/authentication';

let router = express.Router();

router.get('/practices',PracticeController.getAll);
router.post('/practices', checkToken, PracticeController.create);
router.put('/practices/:id',checkToken, PracticeController.update);
router.get('/practices/:id',PracticeController.getOne);
router.delete('/practices/:id',checkToken, PracticeController.delete);

export default router;
