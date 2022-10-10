import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addHours } from 'date-fns';
import Imagekit = require('imagekit');
import { RegisterPlayerDto } from './dto/register-player.dto';
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
    const playerBirthDate = new Date(registerPlayerDto.birthDate);
    const added = addHours(playerBirthDate, 9);
    const data = {
      ...registerPlayerDto,
      birthDate: added.toISOString(),
    };
    return this.playersRepository.createPlayer(data);
  }
}
