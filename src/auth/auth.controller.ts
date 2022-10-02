import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUpUser(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUpUser(signUpDto);
  }

  @Post('login')
  signInUser(@Body(ValidationPipe) signInDtS: SignInDto) {
    return this.authService.signInUser(signInDtS);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  test(@Req() req) {
    console.log('user: ', req.user);
  }
}
