import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { omit } from 'lodash';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { UserStatus } from './enum/user-status.enum';
import { User } from './user.entity';

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

    if (!user) {
      throw new UnauthorizedException('해당하는 사용자가 존재하지 않습니다.');
    }

    return user;
  }

  async findUserById(id: number) {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return omit(user, 'password');
  }
}
