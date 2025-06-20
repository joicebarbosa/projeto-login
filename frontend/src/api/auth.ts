// frontend/src/api/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao fazer login. Verifique suas credenciais.');
    }
    throw new Error('Erro de conexão ao servidor. Verifique se o backend está rodando.');
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao registrar. Tente novamente.');
    }
    throw new Error('Erro de conexão ao servidor. Verifique se o backend está rodando.');
  }
};

// ----------------------------------------------------
// Funções Auxiliares de Token (Verifique se estas estão no seu arquivo!)
// ----------------------------------------------------

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('accessToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const logoutUser = () => {
  setAuthToken(null);
  localStorage.removeItem('userName');
};

const storedToken = getAuthToken();
if (storedToken) {
  setAuthToken(storedToken);
}