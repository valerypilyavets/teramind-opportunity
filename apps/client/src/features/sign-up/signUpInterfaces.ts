import { FetchStatuses } from '../common/commonInterfaces';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SingUpConfirmationProps {
  registeredUser: User
}

export interface SignUpErrorProps {
  error: Error | null
}

export interface SignUpState {
  user: User | null;
  status: FetchStatuses;
}
