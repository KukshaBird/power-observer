import 'reflect-metadata';
import { DataSource } from 'typeorm';
import PowerStatus from './entities/PowerStatus.entity';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  throw new Error('Missing database configuration environment variables');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: [PowerStatus],
  subscribers: [],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
});
