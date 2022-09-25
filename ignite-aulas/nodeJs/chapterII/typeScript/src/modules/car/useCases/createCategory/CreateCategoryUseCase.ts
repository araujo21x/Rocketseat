import ICategoryRepository from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  private categoriesRepository: ICategoryRepository;

  constructor(categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  public async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) throw new Error('Category already exists!');

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
