import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUpUser(signUpDto: SignUpDto) {
    return this.userRepository.createUser(signUpDto);
  }

  async signInUser(signInDto: SignInDto) {
    return this.userRepository.signInUser(signInDto);
  }
}
