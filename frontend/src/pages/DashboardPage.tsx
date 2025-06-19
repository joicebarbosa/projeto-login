import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css"; // Para usar o background
import "../styles/DashboardPage.css"; // Para estilos específicos da Dashboard

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail"); // Pega o email que salvamos
    if (!token) {
      // Se não há token, o usuário não está logado, redireciona para o login
      navigate("/login");
    } else {
      setUserEmail(email);
    }
  }, [navigate]); // O array vazio indica que este efeito roda uma vez ao montar o componente

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove o token
    localStorage.removeItem("userEmail"); // Remove o email
    navigate("/login"); // Redireciona para a página de login
  };

  if (!userEmail) {
    return (
      <div
        className="app-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        Carregando...
      </div>
    ); // Exibe carregando enquanto verifica o token
  }

  return (
    <div className="app-container">
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: "10px",
        }}
      >
        <h2>Bem-vindo, {userEmail}!</h2>
        <p>Você está na sua área logada.</p>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#00e0ff",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
};
