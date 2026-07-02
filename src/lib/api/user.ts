import api from '../axios';
import { PageResponse, User } from '@/lib/interfaces';

export async function fetchUserById(id?: number | string): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

export async function getAllUsersInPage(
  pageSize: number,
  currentPage: number,
  keyword?: string
): Promise<PageResponse<User>> {
  const res = await api.get('/users', { params: { pageSize, currentPage, keyword } });
  return res.data;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await api.get(`/users/all`);
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
export async function createUser(user: User): Promise<User> {
  const res = await api.post(`/users`, user);
  return res.data;
}
