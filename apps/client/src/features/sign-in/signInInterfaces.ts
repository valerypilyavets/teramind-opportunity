import { FetchStatuses } from '../common/commonInterfaces';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInState {
  isAuthorised: boolean
  status: FetchStatuses;
}