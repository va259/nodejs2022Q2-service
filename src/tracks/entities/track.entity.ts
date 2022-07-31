import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist: Artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string; // refers to Artist

  @ManyToOne(() => Album, (album: Album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  album: string;

  @Column({ nullable: true })
  albumId: string; // refers to Album

  @Column()
  duration: number; // integer number

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
