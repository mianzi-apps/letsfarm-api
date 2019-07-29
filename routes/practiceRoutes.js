import express from 'express';
import PracticeController from '../controllers/practice';
import { checkToken } from '../middleware/authentication';

let router = express.Router();

router.get('/practices',PracticeController.getAll);
router.post('/practice', checkToken, PracticeController.create);
router.put('/practice/:id',checkToken, PracticeController.update);
router.get('/practice/:id',PracticeController.getOne);
router.delete('/practice/:id',checkToken, PracticeController.delete);

export default router;
