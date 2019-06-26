import {checkToken} from "../middleware/authentication";
const express = require('express');
import DiseasesController from '../controllers/diseases';

const router = express.Router();

router.post('/disease/:id/create', checkToken, DiseasesController.create);
router.get('/disease/:id', DiseasesController.getOne);
router.put('/disease/:id', checkToken, DiseasesController.update);
router.delete('/disease/:id', DiseasesController.delete);
router.get('/category/:id/diseases/', DiseasesController.getAllCategoryDiseases);
router.get('/diseases/', DiseasesController.getAll);

export default router;
