import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { User } from './user.entity';

@UseInterceptors(SuccessInterceptor)
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
  signInUser(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signInUser(signInDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@GetUser() user: User) {
    return this.authService.getMe(user);
  }

  @Get()
  test(@GetUser() user) {
    return user;
  }
}
