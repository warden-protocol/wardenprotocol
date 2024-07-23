import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { config } from '../config/schema.js';
import { GmpRequest } from './entity/index.js';

export const WormholeDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [GmpRequest],
  migrations: [],
  subscribers: [],
});
