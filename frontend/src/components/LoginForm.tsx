// frontend/src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login
import { loginUser, setAuthToken } from '../api/auth'; // Importe as funções de auth
import { InputField } from './InputField'; // Seu componente de input
import '../styles/Form.css'; // Seus estilos CSS

interface LoginFormProps {
  // Se precisar passar props, adicione aqui
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página

    setError(null); // Limpa erros anteriores

    try {
      const data = await loginUser(email, password);
      setAuthToken(data.accessToken); // Armazena o token
      console.log('Login bem-sucedido!', data.user);
      // Redirecionar para o dashboard ou página principal
      navigate('/dashboard'); // Redireciona para /dashboard
    } catch (err: any) {
      // Tratar erros do login
      console.error('Erro ao fazer login:', err.message);
      setError(err.message || 'Ocorreu um erro inesperado.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Exibe mensagens de erro */}
      <InputField
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="form-button">
        Entrar
      </button>
      <p>
        Ainda não tem uma conta? <a href="/register">Cadastre-se aqui</a>
      </p>
    </form>
  );
};

export default LoginForm;