import { BaseEntityWithTimestamp } from 'src/common/Entities/base-entity-timestap.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserStatus } from './enum/user-status.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntityWithTimestamp {
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
