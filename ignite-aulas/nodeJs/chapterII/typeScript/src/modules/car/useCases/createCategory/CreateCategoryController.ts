import { Request, Response } from 'express';
import CreateCategoryUseCase from './CreateCategoryUseCase';

class CreateCategoryController {
  createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  handler(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export default CreateCategoryController;
