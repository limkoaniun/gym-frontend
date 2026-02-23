import { Tag } from '@/lib/interfaces';
import api from '@/lib/axios';

export async function getAllTags(): Promise<Tag[]> {
  const res = await api.get('/tags');
  return res.data;
}
export async function delTag(id: string | Array<string>): Promise<boolean> {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
}
export async function addTag(tag: Tag): Promise<Tag>{
  const res = await api.post(`/tags`, {name: tag.name});
  return res.data;
}