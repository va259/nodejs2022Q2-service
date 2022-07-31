import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    return await this.tracksRepository.findOneBy({ id: id });
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = new Track({ id: v4(), ...createTrackDto });
    await this.tracksRepository.save(track);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: Track = await this.tracksRepository.findOneBy({ id: id });

    if (!track) throw new NotFoundException('Track not found');

    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;

    await this.tracksRepository.save(track);
    return track;
  }

  async remove(id: string) {
    const track: Track = await this.tracksRepository.findOneBy({ id: id });

    if (!track) throw new NotFoundException('Track not found');

    await this.tracksRepository.remove(track);
    return track;
  }
}
