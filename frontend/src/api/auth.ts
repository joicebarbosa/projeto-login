// frontend/src/api/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // URL base para as rotas de autenticação

interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// Função para lidar com o login
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; // Retorna os dados da resposta (accessToken e user)
  } catch (error) {
    // É importante tratar erros de forma mais específica no frontend
    if (axios.isAxiosError(error) && error.response) {
      // O backend retornou um erro com status (ex: 401 Unauthorized)
      throw new Error(error.response.data.message || 'Erro no login.');
    } else {
      // Outro tipo de erro (ex: problema de rede, backend offline)
      throw new Error('Erro de conexão com o servidor. Verifique se o backend está rodando.');
    }
  }
};

// Função para armazenar o token
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('accessToken', token);
    // Opcional: Adicionar o token a todas as requisições futuras do Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Função para obter o token (útil para verificar se o usuário está logado)
export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Opcional: Função para remover o token ao deslogar
export const logoutUser = () => {
  setAuthToken(null);
  // Adicionar lógica de redirecionamento ou limpeza de estado aqui, se necessário.
};

// No carregamento da aplicação, tente carregar um token existente
const storedToken = getAuthToken();
if (storedToken) {
  setAuthToken(storedToken);
}