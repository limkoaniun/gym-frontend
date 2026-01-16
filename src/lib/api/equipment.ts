import api from '../axios';
import { Equipment, Usage, User } from '@/lib/interfaces';

export async function searchEquipments(query?: string): Promise<Equipment[]> {
  let res;
  if (query) {
    res = await api.post('/equipment/ai-search', { query });
  } else {
    res = await api.get('/equipments');
  }

  return res.data;
}

export async function searchEquipmentsByImage(file: File): Promise<Equipment[]> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await api.post('/equipment/search-by-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

export async function fetchEquipmentById(id: string): Promise<Equipment> {
  const res = await api.get(`/equipments/${id}`);
  return res.data;
}

export async function fetchUsageById(id: string): Promise<Usage> {
  const res = await api.get(`/usages/${id}`);
  return res.data;
}

export async function addFavoriteEquipments(equipmentId: string): Promise<User> {
  const res = await api.post('/users/favours', { equipmentId });
  return res.data;
}
