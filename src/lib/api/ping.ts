import api from '../axios'; // Adjust path if needed

export const pingServer = async () => {
  const response = await api.get('/ping'); // Hits http://localhost:8080/api/ping
  return response.data;
};
