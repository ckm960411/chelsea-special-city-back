import { IsNumber, IsString } from 'class-validator';
import { Player } from 'src/players/player.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ default: '' })
  season: string;

  @IsNumber()
  @Column({ default: 0 })
  appearances: number;

  @IsNumber()
  @Column({ default: 0 })
  totalMinutesPlayed: number;

  @IsNumber()
  @Column({ default: 0 })
  goals: number;

  @IsNumber()
  @Column({ default: 0 })
  cleanSheets: number;

  @ManyToOne(() => Player, (player) => player)
  @JoinColumn()
  player: Player;
}
