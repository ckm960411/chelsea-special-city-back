import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { Player } from './player.entity';

@CustomRepository(Player)
export class PlayerRepository extends Repository<Player> {
  async createPlayer(registerPlayerDto: RegisterPlayerDto) {
    const player = this.create(registerPlayerDto);

    try {
      await this.save(player);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 선수입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
