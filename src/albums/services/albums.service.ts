import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import InMemoryDB from '../../db/db.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(public db: InMemoryDB) {}
  // private albums: Array<Album> = [];

  async findAll() {
    return this.db.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album: Album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = new Album({ ...createAlbumDto, id: v4() });
    this.db.albums.push(album);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const index: number = this.db.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found');
    } else {
      const newAlbum = { id: id, ...updateAlbumDto };
      this.db.albums[index] = newAlbum;
      return newAlbum;
    }
  }

  async remove(id: string) {
    const index: number = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    } else {
      this.db.albums.splice(index, 1);
      this.db.tracks.map((track) => {
        if (track.albumId === id) track.albumId = null;
      });
    }
  }
}
