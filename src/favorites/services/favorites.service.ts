import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import InMemoryDB from '../../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(public db: InMemoryDB) {}

  findAll() {
    const respnose = {
      artists: this.db.favorites.artists.map((artistId) => {
        const artist = this.db.artists.find((artist) => artist.id === artistId);
        return artist;
      }),
      albums: this.db.favorites.albums.map((albumId) => {
        const album = this.db.albums.find((album) => album.id === albumId);
        return album;
      }),
      tracks: this.db.favorites.tracks.map((trackId) => {
        const track = this.db.tracks.find((track) => track.id === trackId);
        return track;
      }),
    };
    return respnose;
  }

  addTrack(id: string) {
    const item = this.db.tracks.find((item) => item.id === id);
    if (!item) throw new UnprocessableEntityException(`Track doesn't exist`);
    this.db.favorites.tracks.push(id);
    return 'Track was successfully added to favorites';
  }

  removeTrack(id: string) {
    const index: number = this.db.favorites.tracks.findIndex(
      (item) => item === id,
    );
    if (index === -1) {
      throw new NotFoundException('Track is not in favorites');
    } else {
      this.db.favorites.tracks.splice(index, 1);
      return 'Track was successfully removed from favorites';
    }
  }

  addAlbum(id: string) {
    const item = this.db.albums.find((item) => item.id === id);
    if (!item) throw new UnprocessableEntityException(`Album doesn't exist`);
    this.db.favorites.albums.push(id);
    return 'Album was successfully added to favorites';
  }

  removeAlbum(id: string) {
    const index: number = this.db.favorites.albums.findIndex(
      (item) => item === id,
    );
    if (index === -1) {
      throw new NotFoundException('Album is not in favorites');
    } else {
      this.db.favorites.albums.splice(index, 1);
      return 'Album was successfully removed from favorites';
    }
  }

  addArtist(id: string) {
    const item = this.db.artists.find((item) => item.id === id);
    if (!item) throw new UnprocessableEntityException(`Artist doesn't exist`);
    this.db.favorites.artists.push(id);
    return 'Artist was successfully added to favorites';
  }

  removeArtist(id: string) {
    const index: number = this.db.favorites.artists.findIndex(
      (item) => item === id,
    );
    if (index === -1) {
      throw new NotFoundException('Artist is not in favorites');
    } else {
      this.db.favorites.artists.splice(index, 1);
      return 'Artist was successfully removed from favorites';
    }
  }
}
