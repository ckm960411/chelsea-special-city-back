import { UserStatus } from '../user.entity';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 오직 영어와 숫자만 섞어서 쓸 수 있습니다.',
  })
  password: string;

  userStatus?: UserStatus;
}
