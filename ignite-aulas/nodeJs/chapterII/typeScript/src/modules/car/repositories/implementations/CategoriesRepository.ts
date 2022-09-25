import { Repository } from 'typeorm';
import database from '../../../../database';
import Category from '../../entities/Category';
import ICategoryRepository, {
  ICreateCategoryDTO,
} from '../ICategoryRepository';

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  public constructor() {
    this.repository = database.getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category: Category = this.repository.create({ name, description });
    await this.repository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }
}

export default CategoriesRepository;
