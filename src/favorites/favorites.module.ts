import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './favorites.controller';
import InMemoryDB from '../db/db.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryDB],
})
export class FavoritesModule {}
