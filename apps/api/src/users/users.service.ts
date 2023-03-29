import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from './users.interfaces';
import { SignUpDto } from '../auth/auth.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
      password: '$2a$12$CcNkt.yywJ841f78oZ6poORkM9CWf3zF0oazkkqYO1YTCHa1aTJCm',
    },
  ];

  async createUser(signUpData: Omit<SignUpDto, 'passwordConfirmation'>): Promise<User> {
    const length = this.users.push({
      ...signUpData,
      password: await hash(signUpData.password, 12),
      id: this.users.length + 1,
    });
    return this.users[length - 1];
  }

  findByEmail(email: string): User {
    return this.users.find(u => u.email === email);
  }

  findById(id: number): Omit<User, 'password'> {
    const { password: _, ...user } = this.users.find(u => u.id === id);
    if (!user) {

    }
    return user;
  }
}