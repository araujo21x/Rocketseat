import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Category from '../modules/car/entities/Category';
import { createTableCategories1664132314419 } from './migration/1664132314419-create_table_categories';

// eslint-disable-next-line import/prefer-default-export
export default new DataSource({
  type: 'postgres',
  url: process.env.URL_DATABASE,
  host: process.env.DB_HOST,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  entities: [Category],
  migrations: [createTableCategories1664132314419],
});
