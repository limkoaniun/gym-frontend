import { Media } from '@/lib/interfaces';
import api, { fileApi } from '@/lib/axios';

export async function getAllMedias(): Promise<Media[]> {
  const res = await api.get('/medias');
  return res.data;
}

export async function deleteMedia(id: string): Promise<boolean> {
  const res = await api.delete(`/medias/${id}`);
  return res.data;
}

export const uploadMediaFile = async (file: File, name: string) => {
  const formData = new FormData();
  formData.append('file', file);

  if (name.trim()) {
    formData.append('name', name);
  }

  const res = await fileApi.post(`/medias/upload`, formData);
  return res.data;
};

export async function updateMediaName(id: number, newMediaName: string): Promise<Media> {
  const res = await api.put(`/medias/${id}`, { name: newMediaName });
  return res.data;
}
