import { Muscle } from '@/lib/interfaces';
import api from '@/lib/axios';

export async function getAllMuscles(): Promise<Muscle[]> {
  const res = await api.get('/muscles');
  return res.data;
}
export async function updateMuscle(muscle: Muscle): Promise<Muscle> {
  const res = await api.put(`/muscles/${muscle.id}`, muscle);
  return res.data;
}
export async function deleteMuscle(id: string | Array<string>): Promise<Muscle[]> {
  const res = await api.delete(`/muscles/${id}`);
  return res.data;
}
export async function createMuscle(muscle: Muscle): Promise<Muscle[]> {
  const res = await api.post(`/muscles`, muscle);
  return res.data;
}
