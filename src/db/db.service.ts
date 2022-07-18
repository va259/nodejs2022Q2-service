import { Injectable } from '@nestjs/common';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Favorites } from '../favorites/entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/users.entity';

@Injectable()
export class InMemoryDB {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  users: User[] = [];
  favorites: Favorites = { artists: [], albums: [], tracks: [] };
  private static instance;

  constructor() {
    if (!InMemoryDB.instance) InMemoryDB.instance = this;
    return InMemoryDB.instance;
  }
}

export default InMemoryDB;
