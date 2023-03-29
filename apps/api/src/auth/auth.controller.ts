import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req, @Body() user: SignInDto) {
    return this.authService.findSignedInUser(user);
  }

  @Post('sign-up')
  signUp(@Body() user: SignUpDto) {
    return this.authService.registerUser(user);
  }
}
