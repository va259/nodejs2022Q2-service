import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async findAll() {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return await this.artistsRepository.findOneBy({ id });
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = new Artist({ id: v4(), ...createArtistDto });
    await this.artistsRepository.save(artist);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist: Artist = await this.artistsRepository.findOneBy({ id: id });

    if (!artist) throw new NotFoundException('Artist not found');

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    await this.artistsRepository.save(artist);
    return artist;
  }

  async remove(id: string) {
    const artist: Artist = await this.artistsRepository.findOneBy({ id: id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      await this.artistsRepository.remove(artist);
    }
  }
}
