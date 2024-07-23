import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Lead } from './leads/lead.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Post, Lead],
  migrations: ['dist/migration/*.js'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
