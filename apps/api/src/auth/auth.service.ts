import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { SignUpDto, SignInDto } from './auth.dto';
import { ReturnedUser } from '../users/users.interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async validateUser(email: string, password: string): Promise<ReturnedUser> {
    const user = this.usersService.findByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Username or password is incorrect');
    }
    const { password: _password, ...returnedUser } = user;
    return returnedUser;
  }

  findSignedInUser(signInData: SignInDto): ReturnedUser {
    const user = this.usersService.findByEmail(signInData.email);
    const { password: _password,  ...returnedUser } = user;
    return returnedUser;
  }

  async registerUser(signUpData: SignUpDto): Promise<ReturnedUser> {
    const existingUser = this.usersService.findByEmail(signUpData.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new BadRequestException('Password and confirmation should match');
    }
    const {passwordConfirmation: _passwordConfirmation, ...userData} = signUpData;
    const user = await this.usersService.createUser(userData);
    const { password: _password,  ...returnedUser } = user;
    return returnedUser;
  }
}