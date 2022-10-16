import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Position } from './enum';
import { Comment } from 'src/comments/comment.entity';
import { Stat } from 'src/stats/stats.entity';

@Entity()
@Unique(['name'])
export class Player extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: 'id',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Mason Mount',
    description: `player's name`,
    required: true,
  })
  @IsString()
  @Column('text', { nullable: false, unique: true })
  name: string;

  @ApiProperty({
    example: `https://img.chelseafc.com//image/upload/f_auto,q_auto:best,f_auto,q_50,h_860/editorial/people/first-team/2022-23/Mount_profile_avatar_final_22-23.png`,
    description: `player's profile img URL`,
    required: true,
  })
  @IsString()
  @Column()
  profileImg: string;

  @ApiProperty({
    example: '19',
    description: `player's backnumber`,
    required: true,
  })
  @IsNumber()
  @Column()
  backNumber: number;

  @ApiProperty({
    example: 'MIDFIELDER',
    description: `player's position`,
    required: true,
  })
  @IsString()
  @Column({ type: 'enum', enum: Position, default: null })
  position: Position;

  @ApiProperty({
    example: 'CAM, CM, LM, RM, LW, RW',
    description: `player's detail position list`,
  })
  @Column('text', { array: true })
  detailPosition: string[];

  @ApiProperty({
    example: 'England',
    description: `player's national team`,
  })
  @IsString()
  @Column()
  nationalTeam: string;

  @ApiProperty({
    example: 'England',
    description: `player's place of birth`,
  })
  @IsString()
  @Column()
  birthPlace: string;

  @ApiProperty({
    example: '1999-01-09T15:00:00.000Z',
    description: `player's date of birth`,
  })
  @IsDateString()
  @Column()
  birthDate: string;

  @ApiProperty({
    example: '181',
    description: `player's height`,
  })
  @IsNumber()
  @Column()
  height: number;

  @OneToMany(() => Comment, (comment) => comment.player)
  comments: Promise<string[]>;

  @OneToMany(() => Stat, (stat) => stat.player)
  stats: Promise<Stat>;
}
