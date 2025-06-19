// frontend/src/api/auth.ts
import axios from 'axios'

const API_URL = 'http://localhost:3000/auth'

interface LoginResponse {
  accessToken: string
  user: {
    id: number
    email: string
    name: string // <-- Adicionado: Seu backend retorna o nome no login também
  }
}

interface RegisterResponse {
  id: number // <-- Alterado: Seu backend retorna o id do usuário registrado
  name: string // <-- Alterado: Seu backend retorna o nome do usuário registrado
  email: string // <-- Alterado: Seu backend retorna o email do usuário registrado
  createdAt: string // <-- Adicionado: Seu backend retorna createdAt
  updatedAt: string // <-- Adicionado: Seu backend retorna updatedAt
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Erro ao fazer login. Verifique suas credenciais.' // Mensagem mais amigável
      )
    }
    throw new Error(
      'Erro de conexão ao servidor. Verifique se o backend está rodando.'
    )
  }
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    })
    return response.data // o backend retorna o objeto do usuário, não { message: string, user: {} }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Erro ao registrar. Tente novamente.' // Mensagem mais amigável
      )
    }
    throw new Error(
      'Erro de conexão ao servidor. Verifique se o backend está rodando.'
    )
  }
}