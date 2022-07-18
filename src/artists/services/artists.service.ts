import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import InMemoryDB from '../../db/db.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(public db: InMemoryDB) {}
  // private artists: Array<Artist> = [];

  async findAll() {
    return this.db.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return artist;
    }
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = new Artist({ id: v4(), ...createArtistDto });
    this.db.artists.push(artist);
    return await artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    // const track: Track = this.tracks.find((t: Track) => t.id === id);
    const index: number = this.db.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    } else {
      const newArtist = { id: id, ...updateArtistDto };
      this.db.artists[index] = newArtist;
      return newArtist;
    }
  }

  async remove(id: string) {
    const index: number = this.db.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    } else {
      this.db.artists.splice(index, 1);

      this.db.tracks.map((track) => {
        if (track.albumId === id) track.albumId = null;
        if (track.artistId === id) track.artistId = null;
      });

      const artistIdInFavs = this.db.favorites.artists.findIndex(
        (item) => item === id,
      );
      if (artistIdInFavs !== -1)
        this.db.favorites.artists.splice(artistIdInFavs, 1);
    }
  }
}
