import { Request, Response } from 'express';
import ListCategoriesUseCase from './ListCategoriesUseCase';

class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  handler(request: Request, res: Response): Response {
    const all = this.listCategoriesUseCase.execute();

    return res.status(200).json(all);
  }
}

export default ListCategoriesController;
