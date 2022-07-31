import { Module } from '@nestjs/common';
import InMemoryDB from '../db/db.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryDB],
})
export class UsersModule {}
