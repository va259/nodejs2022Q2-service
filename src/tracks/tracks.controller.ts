import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    const track = await this.tracksService.findOne(id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return await this.tracksService.remove(id);
  }
}
