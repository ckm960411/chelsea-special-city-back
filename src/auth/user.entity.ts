import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStatus {
  PUBLIC = 'public',
  ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  userStatus: UserStatus;
}
