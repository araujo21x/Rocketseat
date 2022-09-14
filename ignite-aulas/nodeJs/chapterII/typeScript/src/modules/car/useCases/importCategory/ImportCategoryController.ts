import { Request, Response } from 'express';
import ImportCategoryUseCase from './ImportCategoryUseCase';

class ImportCategoryController {
  importCategoryUseCase: ImportCategoryUseCase;

  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  handler(req: Request, res: Response): Response {
    this.importCategoryUseCase.execute(req.file as Express.Multer.File);

    return res.status(201).send();
  }
}

export default ImportCategoryController;
