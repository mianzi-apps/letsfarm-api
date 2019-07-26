import express from 'express';
import UserController from '../controllers/user';

let router = express.Router();

router.post('/user', UserController.create);
router.post('/user/login', UserController.login);

module.exports = router;
