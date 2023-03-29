import { SignInPayload } from './signInInterfaces';
import axios, { AxiosResponse } from 'axios';

export async function fetchSignIn(payload: SignInPayload): Promise<AxiosResponse> {
  return await axios.post('/auth/sign-in', payload);
}