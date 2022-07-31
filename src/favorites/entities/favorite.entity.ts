import { Exclude } from 'class-transformer';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Array<Artist>;

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Array<Album>;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Array<Track>;

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}

export class FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(partial: Partial<FavoritesRepsonse>) {
    Object.assign(this, partial);
  }
}
