import Category from '../../entities/Category';
import ICategoryRepository from '../../repositories/ICategoryRepository';

class ListCategoriesUseCase {
  private categoriesRepository: ICategoryRepository;

  constructor(categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  public execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export default ListCategoriesUseCase;
