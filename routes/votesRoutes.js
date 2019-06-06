import VotesController from '../controllers/votes';
const express = require('express');
const router = express.Router();

router.post('/question/:id/vote',VotesController.create);
router.get('/question/:id/vote',VotesController.getAll);

export default router;