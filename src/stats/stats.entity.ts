import { IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
