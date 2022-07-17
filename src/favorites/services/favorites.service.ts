import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import InMemoryDB from '../../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(public db: InMemoryDB) {}

  async findAll() {
    // const respnose = this.db.favorites;
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
    console.log(respnose);
    return respnose;
  }

  async addTrack(id: string) {
    const item = this.db.tracks.find((item) => item.id === id);
    if (!item) throw new UnprocessableEntityException(`Track doesn't exist`);
    this.db.favorites.tracks.push(id);
    // console.log('track should be added to favs:', this.db);
    return 'Track was successfully added to favorites';
  }

  async removeTrack(id: string) {
    const index: number = this.db.favorites.tracks.findIndex(
      (item) => item === id,
    );
    if (index === -1) {
      throw new NotFoundException('Track is not in favorites');
    } else {
      this.db.favorites.tracks.splice(index, 1);
      // console.log('track should be removed from favs:', this.db);
      return 'Track was successfully removed from favorites';
    }
  }

  async addAlbum(id: string) {
    const item = this.db.albums.find((item) => item.id === id);
    if (!item) throw new UnprocessableEntityException(`Album doesn't exist`);
    this.db.favorites.albums.push(id);
    // console.log('track should be added to favs:', this.db);
    return 'Album was successfully added to favorites';
  }

  async removeAlbum(id: string) {
    const index: number = this.db.favorites.albums.findIndex(
      (item) => item === id,
    );
    if (index === -1) {
      throw new NotFoundException('Album is not in favorites');
    } else {
      this.db.favorites.albums.splice(index, 1);
      // console.log('track should be removed from favs:', this.db);
      return 'Album was successfully removed from favorites';
    }
  }

  async addArtist(id: string) {
    const item = this.db.artists.find((item) => item.id === id);
    if (!item) throw new UnprocessableEntityException(`Artist doesn't exist`);
    this.db.favorites.artists.push(id);
    // console.log('track should be added to favs:', this.db);
    return 'Artist was successfully added to favorites';
  }

  async removeArtist(id: string) {
    const index: number = this.db.favorites.artists.findIndex(
      (item) => item === id,
    );
    if (index === -1) {
      throw new NotFoundException('Artist is not in favorites');
    } else {
      this.db.favorites.artists.splice(index, 1);
      // console.log('track should be removed from favs:', this.db);
      return 'Artist was successfully removed from favorites';
    }
  }
}
