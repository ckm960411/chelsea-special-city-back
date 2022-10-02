import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntityWithTimestamp } from 'src/common/Entities/base-entity-timestap.entity';
import { Column, Entity, Unique } from 'typeorm';
import { UserStatus } from './enum/user-status.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntityWithTimestamp {
  @ApiProperty({
    example: 'KMin',
    description: 'username',
    required: true,
  })
  @IsString()
  @Column('text', { nullable: true, default: '' })
  username: string;

  @ApiProperty({
    example: 'kmin@kakao.com',
    description: 'email',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'password',
    required: true,
  })
  @Column('text')
  password: string;

  @ApiProperty({
    description: 'profile image',
    required: false,
    default: '',
  })
  @Column('text', { default: '' })
  profileImage: string;

  @ApiProperty({
    example: `ADMIN or PUBLIC`,
    description: 'user role',
    required: false,
    default: 'PUBLIC',
  })
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PUBLIC })
  userStatus: UserStatus;
}
