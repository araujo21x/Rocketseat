import { Router } from 'express';
import { createCategoryController } from '../modules/car/useCases/createCategory';
import { listCategoriesController } from '../modules/car/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handler(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handler(req, res);
});

export default categoriesRoutes;
