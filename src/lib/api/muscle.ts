import { Muscle, PageResponse } from '@/lib/interfaces';
import api from '@/lib/axios';

export async function getAllMusclesInPage(
  pageSize: number,
  currentPage: number,
  keyword?: string
): Promise<PageResponse<Muscle>> {
  const res = await api.get('/muscles', { params: { pageSize, currentPage, keyword } });
  return res.data;
}

export async function getAllMuscles(): Promise<Muscle[]> {
  const res = await api.get('/muscles/all');
  return res.data;
}

export async function updateMuscle(muscle: Muscle): Promise<Muscle> {
  const res = await api.put(`/muscles/${muscle.id}`, muscle);
  return res.data;
}

export async function deleteMuscle(id: string | Array<string>): Promise<boolean> {
  const res = await api.delete(`/muscles/${id}`);
  return res.data;
}

export async function createMuscle(muscle: Muscle): Promise<Muscle> {
  const res = await api.post(`/muscles`, { name: muscle.name });
  return res.data;
}
