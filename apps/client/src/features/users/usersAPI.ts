import axios, { AxiosResponse } from 'axios';

export async function fetchSelf(): Promise<AxiosResponse> {
  return await axios.get('/users/me');
}