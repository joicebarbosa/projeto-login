import React from "react";
import { RegisterForm } from "../components/RegisterForm"; // Importa o formulário de registro'
import { Link } from "react-router-dom";
import "../styles/RegisterPage.css"; // Podemos criar estilos específicos para a página

export const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <h2>Cadastro</h2>
      <RegisterForm />
      <p>
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
};
