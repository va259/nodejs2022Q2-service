import { Module } from '@nestjs/common';
import { InMemoryDB } from './db.service';

@Module({
  providers: [InMemoryDB],
})
export class DbModule {}
