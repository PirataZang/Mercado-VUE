// apiClient.js
import axios from 'axios';
import { toRaw } from 'vue';

// Criação da instância do Axios com configuração padrão
const apiClient = axios.create({
  baseURL: 'http://localhost:5959/', // Coloque a URL base da sua API
  timeout: 10000, // Timeout da requisição (em ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de resposta para tratamento global de erros
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro global de API:', error);
    return Promise.reject(error);
  }
);

export const postData = async (url, data) => {
  try {
    const rawData = toRaw(data);
    const response = await apiClient.post(url, rawData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao enviar dados: ${error.message}`);
  }
};

export const getData = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter dados: ${error.message}`);
  }
};

export const putData = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao enviar dados: ${error.message}`);
  }
};

export const deleteData = async (url, data) => {
  try {
    const response = await apiClient.delete(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao Deletar dados: ${error.message}`);
  }
};


const api = {
  postData,
  getData,
  putData,
  deleteData
};

export default api;

