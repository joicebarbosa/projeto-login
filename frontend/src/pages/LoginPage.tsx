import React from "react";
import { LoginForm } from "../components/LoginForm"; // ou RegisterForm
import { Link } from "react-router-dom";
import "../styles/AuthPages.css"; // Importe os estilos comuns aqui

export const LoginPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <h2>Login</h2>
      <LoginForm />
      <p>
        Ainda não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>
      </p>
    </div>
  );
};
