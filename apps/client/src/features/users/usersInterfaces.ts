import { FetchStatuses } from '../common/commonInterfaces';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UsersState {
  user: null | User;
  status: FetchStatuses
}

