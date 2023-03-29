export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type ReturnedUser = Omit<User, 'password'>
