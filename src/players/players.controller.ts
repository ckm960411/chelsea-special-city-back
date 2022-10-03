import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPlayerImage(@UploadedFile() file) {
    return this.playersService.uploadPlayerImages(file);
  }
}
