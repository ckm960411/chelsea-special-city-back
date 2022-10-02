import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserStatus {
  PUBLIC,
  ADMIN,
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
