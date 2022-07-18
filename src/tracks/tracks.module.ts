import { Module } from '@nestjs/common';
import InMemoryDB from '../db/db.service';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB],
})
export class TracksModule {}
