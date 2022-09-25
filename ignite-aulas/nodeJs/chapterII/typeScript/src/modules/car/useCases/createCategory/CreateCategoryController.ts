import { Request, Response } from 'express';
import CreateCategoryUseCase from './CreateCategoryUseCase';

class CreateCategoryController {
  createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    await this.createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export default CreateCategoryController;
