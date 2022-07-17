import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import InMemoryDB from '../../db/db.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

@Injectable()
export class TracksService {
  constructor(public db: InMemoryDB) {}
  // private tracks: Array<Track> = [];

  async findAll(): Promise<Track[]> {
    return this.db.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track: Track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      return track;
    }
  }

  create(createTrackDto: CreateTrackDto): Track {
    const track: Track = new Track({ id: v4(), ...createTrackDto });
    this.db.tracks.push(track);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const index: number = this.db.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found');
    } else {
      const newTrack = { id: this.db.tracks[index].id, ...updateTrackDto };
      this.db.tracks[index] = newTrack;
      return newTrack;
    }
  }

  async remove(id: string) {
    const index: number = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException('Track not found');
    } else {
      this.db.tracks.splice(index, 1);

      const trackIdInFavs = this.db.favorites.tracks.findIndex(
        (track) => track === id,
      );
      this.db.favorites.tracks.splice(trackIdInFavs, 1);
    }
  }
}
