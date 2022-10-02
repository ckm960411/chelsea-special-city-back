import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  signUpUser(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authService.signUpUser(signUpDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  signInUser(@Body(ValidationPipe) signInDtS: SignInDto) {
    return this.authService.signInUser(signInDtS);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  test(@GetUser() user) {
    return user;
  }
}
