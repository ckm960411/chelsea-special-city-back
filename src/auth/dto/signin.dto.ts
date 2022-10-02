import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../enum/user-status.enum';

export class SignInDto {
  @ApiProperty({
    example: 'kmin@kakao.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'password',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 오직 영어와 숫자만 섞어서 쓸 수 있습니다.',
  })
  password: string;

  userStatus?: UserStatus;
}
