import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    return await this.albumsRepository.findOneBy({ id: id });
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = new Album({ id: v4(), ...createAlbumDto });
    await this.albumsRepository.save(album);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album: Album = await this.albumsRepository.findOneBy({ id: id });

    if (!album) throw new NotFoundException('Album not found');

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    await this.albumsRepository.save(album);
    return album;
  }

  async remove(id: string) {
    const album: Album = await this.albumsRepository.findOneBy({ id: id });

    if (!album) throw new NotFoundException('Album not found');

    await this.albumsRepository.remove(album);
    return album;
  }
}
