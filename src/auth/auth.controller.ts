import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUpUser(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUpUser(signUpDto);
  }
}
