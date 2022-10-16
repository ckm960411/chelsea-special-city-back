import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './player.entity';

@CustomRepository(Player)
export class PlayerRepository extends Repository<Player> {
  async findAllPlayers() {
    try {
      const players = await this.find();
      return players;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findPlayer(name: string) {
    try {
      const player = await this.findOne({ where: { name } });

      if (!player) {
        throw new BadRequestException();
      }

      return player;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async searchPlayers(name: string) {
    try {
      const players = this.createQueryBuilder('players')
        .where(`LOWER(name) LIKE LOWER(:name)`, {
          name: `%${name.toLowerCase()}%`,
        })
        .orderBy('players.backNumber', 'ASC')
        .getMany();

      return players;
    } catch {
      throw new InternalServerErrorException();
    }
  }

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

  async findPlayerById(id: number) {
    const player = await this.findOne({ where: { id } });

    return player;
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto, playerId: number) {
    const player = await this.findPlayerById(playerId);

    if (!player) {
      throw new NotFoundException('일치하는 선수가 없습니다.');
    }

    const data = {
      ...player,
      ...updatePlayerDto,
      id: playerId,
    };

    console.log('data: ', data);

    try {
      await this.save(data);
      return data;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
