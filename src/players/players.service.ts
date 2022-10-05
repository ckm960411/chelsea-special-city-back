import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Imagekit = require('imagekit');
import { RegisterPlayerDto } from './dto/register-player.dto';
import { PlayerRepository } from './players.repository';

@Injectable()
export class PlayersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly playersRepository: PlayerRepository,
  ) {}

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
    return this.playersRepository.createPlayer(registerPlayerDto);
  }
}