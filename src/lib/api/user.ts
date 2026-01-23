import api from '../axios';
import { User } from '@/lib/interfaces';

export async function fetchUserById(id: number): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data;
}