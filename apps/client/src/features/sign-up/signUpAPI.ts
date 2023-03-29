import axios, { AxiosResponse } from 'axios';
import { SignUpPayload } from "./signUpInterfaces";

export async function fetchSignUp(payload: SignUpPayload): Promise<AxiosResponse> {
  return await axios.post('/auth/sign-up', payload);
}