import express from 'express';
import UserController from '../controllers/user';
import { checkToken } from '../middleware/authentication';

let router = express.Router();

router.post('/user', UserController.create);
router.post('/user/login', UserController.login);
router.get('/testToken',checkToken,UserController.mndjkFn);

module.exports = router;