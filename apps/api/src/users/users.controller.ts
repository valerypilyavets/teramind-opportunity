import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from '../logged-in.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @UseGuards(LoggedInGuard)
  @Get('me')
  user(@Req() req) {
    return this.usersService.findById(req.user.id);
  }
}