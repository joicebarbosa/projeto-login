// frontend/src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../api/auth'; // Importa funções nomeadas de auth.ts
import InputField from './InputField'; // <-- CORRIGIDO: Importa como default (SEM CHAVES)
import '../styles/Form.css';

interface LoginFormProps {
  // Props, se necessário
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const data = await loginUser(email, password);
      setAuthToken(data.accessToken);
      localStorage.setItem('userName', data.user.name);
      console.log('Login bem-sucedido!', data.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Erro ao fazer login:', err.message);
      setError(err.message || 'Ocorreu um erro inesperado.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <InputField
        label="Email"
        id="login-email"
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Senha"
        id="login-password"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="form-button">
        Entrar
      </button>
      {/* <p className="form-link-text">
        Ainda não tem uma conta? <a href="/register">Cadastre-se aqui</a>
      </p> */}
    </form>
  );
};

export default LoginForm; // Exporta como default