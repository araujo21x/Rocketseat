import { Router } from 'express';
import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryServices from '../services/CreateCategoryServices';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryServices = new CreateCategoryServices(
    categoriesRepository
  );

  createCategoryServices.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  return res.status(200).json(categoriesRepository.list());
});

export default categoriesRoutes;
