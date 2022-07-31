import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorites } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
