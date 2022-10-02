import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { omit } from 'lodash';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User, UserStatus } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto) {
    const { username, email, password, userStatus } = signUpDto;

    const hashedPassword = await hash(password, 10);

    const user = this.create({
      email,
      username,
      password: hashedPassword,
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

  async findUserByEmail(email: string) {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async signInUser(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.findUserByEmail(email);
    const isPasswordMatched = await compare(password, user.password);

    if (user && isPasswordMatched) {
      return omit(user, 'password');
    } else {
      throw new UnauthorizedException('로그인에 실패했습니다.');
    }
  }
}
