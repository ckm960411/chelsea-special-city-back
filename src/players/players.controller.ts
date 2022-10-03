import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadPlayerImage(@UploadedFiles() file) {
    return this.playersService.uploadPlayerImages(file);
  }
}
