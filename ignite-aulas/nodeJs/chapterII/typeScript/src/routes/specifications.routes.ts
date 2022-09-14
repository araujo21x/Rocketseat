import { Router } from 'express';
import { createSpecificationController } from '../modules/car/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) => {
  return createSpecificationController.handler(req, res);
});

export default specificationsRoutes;
