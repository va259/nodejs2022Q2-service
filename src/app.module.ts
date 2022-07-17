import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, DbModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
