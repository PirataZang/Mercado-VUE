// apiClient.ts
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
  (response) => response,
  (error: any) => {
    console.error('Erro global de API:', error);
    return Promise.reject(error);
  }
);

// Tipagem das funções com base no tipo de retorno e parâmetros PQP EM
export const postData = async <T>(url: string, data: T): Promise<any> => {
  try {
    const rawData = toRaw(data);
    const response = await apiClient.post(url, rawData);
    return response.data;
  } catch (error: any) {
    throw new Error(`Erro ao enviar dados: ${error.message}`);
  }
};

export const getData = async (url: string): Promise<any> => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Erro ao obter dados: ${error.message}`);
  }
};

export const putData = async <T>(url: string, data: T): Promise<any> => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(`Erro ao enviar dados: ${error.message}`);
  }
};

export const deleteData = async (url: string): Promise<any> => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Erro ao deletar dados: ${error.message}`);
  }
};

// Definição do objeto 'api'
const api = {
  postData,
  getData,
  putData,
  deleteData
};

export default api;
