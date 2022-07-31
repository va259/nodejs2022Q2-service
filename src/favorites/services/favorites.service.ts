import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { AlbumsService } from '../../albums/services/albums.service';
import { Artist } from '../../artists/entities/artist.entity';
import { ArtistsService } from '../../artists/services/artists.service';
import { Track } from '../../tracks/entities/track.entity';
import { TracksService } from '../../tracks/services/tracks.service';
import { Favorites, FavoritesRepsonse } from '../entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
  ) {}

  async findAll(): Promise<FavoritesRepsonse> {
    const favorites = await this.favoritesRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favorites) return { artists: [], albums: [], tracks: [] };
    return favorites;
  }

  async addTrack(id: string): Promise<string> {
    const track = await this.tracksService.findOne(id);
    console.log('track from artistsService:', track);
    if (!track) throw new UnprocessableEntityException(`Track doesn't exist`);

    const favorites = await this.findAll();
    if (!favorites.tracks.includes(track)) favorites.tracks.push(track);
    await this.favoritesRepository.save(favorites);
    return 'Track was successfully added to favorites';
  }

  async removeTrack(id: string): Promise<string> {
    const favorites = await this.findAll();
    const index = favorites.tracks.findIndex((track: Track) => track.id === id);

    if (index === -1) throw new NotFoundException('Track is not in favorites');

    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.save(favorites);
    return 'Track was successfully removed from favorites';
  }

  async addAlbum(id: string): Promise<string> {
    const album = await this.albumsService.findOne(id);

    if (!album) throw new UnprocessableEntityException(`Album doesn't exist`);

    const favorites = await this.findAll();
    if (!favorites.albums.includes(album)) favorites.albums.push(album);
    await this.favoritesRepository.save(favorites);
    return 'Album was successfully added to favorites';
  }

  async removeAlbum(id: string): Promise<string> {
    const favorites = await this.findAll();
    const index = favorites.albums.findIndex((album: Album) => album.id === id);

    if (index === -1) throw new NotFoundException('Album is not in favorites');

    favorites.albums.splice(index, 1);
    await this.favoritesRepository.save(favorites);
    return 'Album was successfully removed from favorites';
  }

  async addArtist(id: string): Promise<string> {
    const artist = await this.artistsService.findOne(id);
    console.log('artist from artistsService:', artist);
    if (!artist) throw new UnprocessableEntityException(`Artist doesn't exist`);

    const favorites = await this.findAll();
    if (!favorites.artists.includes(artist)) favorites.artists.push(artist);
    await this.favoritesRepository.save(favorites);
    return 'Artist successfully added to favorites';
  }

  async removeArtist(id: string): Promise<string> {
    const favorites = await this.findAll();
    const index = favorites.artists.findIndex((artist: Artist) => artist.id === id);

    if (index === -1) throw new NotFoundException('Artist is not in favorites');

    favorites.artists.splice(index, 1);
    await this.favoritesRepository.save(favorites);
    return 'Artist was successfully removed from favorites';
  }
}
