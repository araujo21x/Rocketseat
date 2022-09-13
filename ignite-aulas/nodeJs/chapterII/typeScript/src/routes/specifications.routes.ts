import { Router } from 'express';
import SpecificationRepository from '../modules/car/repositories/SpecificationRepository';
import CreateSpecificationServices from '../modules/car/services/CreateSpecificationServices';

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createSpecificationServices = new CreateSpecificationServices(
    specificationRepository
  );

  createSpecificationServices.execute({ name, description });

  return res.status(201).send();
});

// specificationsRoutes.get('/', (req, res) => {
//   return res.status(200).json(categoriesRepository.list());
// });

export default specificationsRoutes;
