// frontend/src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm'; // <-- CORRIGIDO: Importa como default (SEM CHAVES)
import { Link } from 'react-router-dom';
import '../styles/AuthPages.css'; // Importa os estilos comuns aqui

const LoginPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <LoginForm />
      <p className="form-link-text">
        Ainda não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>
      </p>
    </div>
  );
};

export default LoginPage; // Exporta como default
