import {checkToken} from "../middleware/authentication";
import ProjectsController from '../controllers/projects';

const express = require('express');
const router = express.Router();

router.post('/project', checkToken, ProjectsController.create);
router.get('/user/:id/projects',ProjectsController.getUserProjects);
router.get('/project/:id',checkToken,ProjectsController.getProject);
router.put('/project/:id',checkToken, ProjectsController.update);
router.delete('/project/:id',checkToken, ProjectsController.delete);

export default router;
