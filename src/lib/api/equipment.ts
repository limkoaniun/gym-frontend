import api from '../axios';
import { Equipment } from '@/lib/interfaces';

export async function searchEquipments(query?: string): Promise<Equipment[]> {
  let res;
  if (query) {
    res = await api.post('/equipment/ai-search', { query });
  } else {
    res = await api.get('/equipments');
  }

  return res.data;
}
