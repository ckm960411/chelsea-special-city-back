import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Imagekit = require('imagekit');

@Injectable()
export class PlayersService {
  constructor(private readonly configService: ConfigService) {}

  async uploadPlayerImages(file) {
    const imagekit = new Imagekit({
      publicKey: this.configService.get<string>('IMAGE_KIT_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('IMAGE_KIT_PRIVATE_KEY'),
      urlEndpoint: this.configService.get<string>('IMAGE_KIT_URL_END_POINT'),
    });

    const response = await imagekit
      .upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: 'players',
      })
      .then((res) => res.url);

    return response;
  }
}
