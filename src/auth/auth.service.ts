import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUpUser(signUpDto: SignUpDto) {
    return this.userRepository.createUser(signUpDto);
  }

  async signInUser(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findUserByEmail(email);

    const isPasswordValidated = await compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const userWithoutPassword = omit(user, 'password');
    const accessToken = this.jwtService.sign({ email: signInDto.email });
    return {
      ...userWithoutPassword,
      token: accessToken,
    };
  }

  async getMe(user: User) {
    const found = await this.userRepository.findUserById(user.id);
    return found;
  }
}
