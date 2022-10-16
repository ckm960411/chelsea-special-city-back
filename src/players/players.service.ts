import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addHours, startOfDay } from 'date-fns';
import Imagekit = require('imagekit');
import { User } from 'src/auth/user.entity';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRepository } from './players.repository';

@Injectable()
export class PlayersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly playersRepository: PlayerRepository,
  ) {}

  async getAllPlayers() {
    return this.playersRepository.findAllPlayers();
  }

  async getPlayer(name: string) {
    let playerName: string;
    if (name.includes('_')) {
      playerName = name.split('_').join(' ');
    } else {
      playerName = name;
    }
    const player = await this.playersRepository.findPlayer(playerName);

    return player;
  }

  async getPlayerById(playerId: number) {
    const player = await this.playersRepository.findPlayerById(playerId);

    if (!player) {
      throw new UnauthorizedException();
    }

    return player;
  }

  async searchPlayers(name: string) {
    const players = await this.playersRepository.searchPlayers(name);

    return players;
  }

  async uploadPlayerImages(files) {
    const imagekit = new Imagekit({
      publicKey: this.configService.get<string>('IMAGE_KIT_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('IMAGE_KIT_PRIVATE_KEY'),
      urlEndpoint: this.configService.get<string>('IMAGE_KIT_URL_END_POINT'),
    });

    const uploadImagekit = async (file: any) => {
      return await imagekit
        .upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: 'players',
        })
        .then((res) => res.url);
    };

    const promises = files.map((file) => {
      return uploadImagekit(file);
    });

    const result = await Promise.all(promises);
    return result;
  }

  async registerPlayer(registerPlayerDto: RegisterPlayerDto) {
    const playerBirtDate = startOfDay(new Date(registerPlayerDto.birthDate));
    const added = addHours(playerBirtDate, 9);
    const data = {
      ...registerPlayerDto,
      birthDate: added.toISOString(),
    };

    return this.playersRepository.createPlayer(data);
  }

  async updatePlayer(
    user: User,
    updatePlayerDto: UpdatePlayerDto,
    playerId: number,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const playerBirtDate = startOfDay(new Date(updatePlayerDto.birthDate));
    const added = addHours(playerBirtDate, 9);
    const data = {
      ...updatePlayerDto,
      birthDate: added.toISOString(),
    };

    return this.playersRepository.updatePlayer(data, playerId);
  }
}
