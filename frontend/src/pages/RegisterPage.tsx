// frontend/src/pages/RegisterPage.tsx
import React from 'react';
import RegisterForm from '../components/RegisterForm'; // <-- CORRIGIDO: Importa como default (SEM CHAVES)
import { Link } from 'react-router-dom';
import '../styles/AuthPages.css'; // Usa estilos comuns para o background e centralização

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <RegisterForm />
      <p className="form-link-text">
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
};

export default RegisterPage; // Exporta como default