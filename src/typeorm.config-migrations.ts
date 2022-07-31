import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_MIGRATIONS,
  port: parseInt(process.env.POSTGRES_PORT as string), // as number,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE_NAME as string,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/typeorm/migration/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
});

export default dataSource;
