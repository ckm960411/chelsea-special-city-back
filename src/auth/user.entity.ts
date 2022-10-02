import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum UserStatus {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN',
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { default: '' })
  profileImage: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PUBLIC })
  userStatus: UserStatus;
}
