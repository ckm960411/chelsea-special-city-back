import { IsNumber, IsString } from 'class-validator';

export class CreateStatsDto {
  @IsString()
  season: string;

  @IsNumber()
  appearances: number;

  @IsNumber()
  totalMinutesPlayed: number;

  @IsNumber()
  goals: number;

  @IsNumber()
  cleanSheets: number;
}
