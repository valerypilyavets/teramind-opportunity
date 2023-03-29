import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, ReturnedUser } from '../users/users.interfaces';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private authService: AuthService, private usersService: UsersService ) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: { id: number }) => void) {
    done(null, { id: user.id });
  }

  deserializeUser(payload: { id: number }, done: (err: Error, user: ReturnedUser) => void) {
    const user = this.usersService.findById(payload.id);
    done(null, user);
  }
}