import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Position } from '../enum';

export class RegisterPlayerDto {
  @ApiProperty({
    example: 'Mason Mount',
    description: `player's name`,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: `https://img.chelseafc.com//image/upload/f_auto,q_auto:best,f_auto,q_50,h_860/editorial/people/first-team/2022-23/Mount_profile_avatar_final_22-23.png`,
    description: `player's profile img URL`,
    required: true,
  })
  @IsString()
  profileImg: string;

  @ApiProperty({
    example: '19',
    description: `player's backnumber`,
    required: true,
  })
  @IsNumber()
  backNumber: number;

  @ApiProperty({
    example: 'MIDFIELDER',
    description: `player's position`,
    required: true,
  })
  @IsString()
  position: Position;

  @ApiProperty({
    example: '[CAM, CM, LM, RM, LW, RW]',
    description: `player's detail position list`,
  })
  detailPosition: string[];

  @ApiProperty({
    example: 'England',
    description: `player's national team`,
  })
  @IsString()
  nationalTeam?: string;

  @ApiProperty({
    example: 'England',
    description: `player's place of birth`,
  })
  @IsString()
  birthPlace?: string;

  @ApiProperty({
    example: '1999-01-09T15:00:00.000Z',
    description: `player's date of birth`,
  })
  @IsString()
  birthDate?: string;

  @ApiProperty({
    example: '181',
    description: `player's height`,
  })
  @IsNumber()
  height?: number;
}
