import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PlayersService } from './players.service';

@UseInterceptors(SuccessInterceptor)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadPlayerImage(@UploadedFiles() files) {
    return this.playersService.uploadPlayerImages(files);
  }
}
