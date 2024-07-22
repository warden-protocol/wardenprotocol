import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { GmpRequest } from './entity/index.js';

export const WormholeDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'newuser',
  password: 'password',
  database: 'wormhole',
  synchronize: false,
  logging: false,
  entities: [GmpRequest],
  migrations: [],
  subscribers: [],
});

WormholeDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
