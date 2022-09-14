import { Router } from 'express';
import multer from 'multer';
import { createCategoryController } from '../modules/car/useCases/createCategory';
import { importCategoryController } from '../modules/car/useCases/importCategory';
import { listCategoriesController } from '../modules/car/useCases/listCategories';

const upload = multer({ dest: './tpm' });
const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handler(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handler(req, res);
});

categoriesRoutes.get('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handler(req, res);
});

export default categoriesRoutes;
