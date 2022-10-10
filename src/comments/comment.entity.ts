import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column()
  @IsString()
  content: string;

  @IsNumber()
  @ManyToOne(() => Player, (player) => player)
  @JoinColumn()
  player: Player;

  @IsNumber()
  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;
}
