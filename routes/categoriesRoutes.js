const express = require('express');
import CategoriesController from '../controllers/categories';
const router= express.Router();


router.post('/category',CategoriesController.create);
router.put('/category/:id',CategoriesController.update);
router.delete('/category/:id',CategoriesController.delete);
router.get('/category/:id',CategoriesController.get);
router.get('/categories',CategoriesController.getAll);

export default router;
