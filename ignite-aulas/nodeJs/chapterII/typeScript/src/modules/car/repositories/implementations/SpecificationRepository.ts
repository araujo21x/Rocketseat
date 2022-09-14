import Specification from '../../model/Specification';
import ISpecificationRepository, {
  ICreateSpecificationDTO,
} from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification(name, description);

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const specification: Specification | undefined = this.specifications.find(
      (element) => element.name === name
    );

    return specification;
  }
}

export default SpecificationRepository;
