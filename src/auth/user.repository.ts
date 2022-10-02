import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User, UserStatus } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto) {
    const { username, email, password, userStatus } = signUpDto;
    const user = this.create({
      email,
      username,
      password,
      userStatus: userStatus ?? UserStatus.PUBLIC,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
