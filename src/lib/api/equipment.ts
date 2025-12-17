import api from '../axios';
import { Equipment } from '@/lib/interfaces';

export async function fetchEquipments(): Promise<Equipment[]> {
  const res = await api.get('/equipments');
  return res.data;
}

export async function searchEquipmentsWithAI(query: string): Promise<Equipment[]> {
  const res = await api.post('/equipment/ai-search', { query });
  return res.data;
}
