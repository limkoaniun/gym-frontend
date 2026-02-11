import api from '../axios';
import { User } from '@/lib/interfaces';

export async function fetchUserById(id: string): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

export async function getAllUsers():Promise<User[]> {
  const res = await api.get(`/users`);
  return res.data;
}
export async function deleteUserById(id: string): Promise<User> {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}
export async function updateUserById(user: User): Promise<User> {
  const res = await api.put(`/users/${user.id}`, user);
  return res.data;
}
export async function createUser(user: User): Promise<User>{
  const res = await api.post(`/users`, user);
  return res.data;
}