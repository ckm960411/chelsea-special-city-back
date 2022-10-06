import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { PlayersService } from './players.service';

@UseInterceptors(SuccessInterceptor)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getAllPlayers() {
    return this.playersService.getAllPlayers();
  }

  @Get(':playerName')
  async getPlayer(@Param('playerName') name: string) {
    return this.playersService.getPlayer(name);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadPlayerImage(@UploadedFiles() files) {
    return this.playersService.uploadPlayerImages(files);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async registerPlayer(@Body() registerPlayerDto: RegisterPlayerDto) {
    return this.playersService.registerPlayer(registerPlayerDto);
  }
}
