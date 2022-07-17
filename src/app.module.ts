import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, DbModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
