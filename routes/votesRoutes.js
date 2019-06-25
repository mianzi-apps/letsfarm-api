import VotesController from '../controllers/votes';
import {checkToken} from "../middleware/authentication";
const express = require('express');
const router = express.Router();

router.post('/question/:id/vote', checkToken, VotesController.create);
router.get('/question/:id/votes', VotesController.getAll);

export default router;
