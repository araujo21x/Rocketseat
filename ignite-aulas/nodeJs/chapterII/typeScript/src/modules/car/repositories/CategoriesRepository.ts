import Category from '../model/Category';
import ICategoryRepository, { ICreateCategoryDTO } from './ICategoryRepository';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category: Category = new Category(name, description);

    this.categories.push(category);
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category | undefined {
    const category = this.categories.find((element) => element.name === name);

    return category;
  }
}

export default CategoriesRepository;
