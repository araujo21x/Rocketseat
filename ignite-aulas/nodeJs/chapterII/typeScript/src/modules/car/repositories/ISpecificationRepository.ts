import Specification from '../entities/Specification';

/* eslint-disable no-unused-vars */
export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}

export default ISpecificationRepository;
