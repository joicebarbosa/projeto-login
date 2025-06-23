// frontend/src/pages/DashboardPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';
// Remova esta linha: import '../styles/AuthPages.css';
import '../styles/DashboardPage.css'; // Mantenha ou adicione esta linha para o novo CSS

const DashboardPage: React.FC = () => {
  const userName = localStorage.getItem('userName'); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); 
    navigate('/login'); 
  };

  return (
    <div className="dashboard-container"> {/* Use a nova classe do DashboardPage.css */}
      <div className="dashboard-card"> {/* Use a nova classe para o cartão de conteúdo */}
        <h1>Bem-vindo, {userName || 'Usuário'}!</h1>
        <p>Você está logado e pode acessar conteúdo protegido.</p>
        <button
          onClick={handleLogout}
          className="logout-button" // Use a nova classe para o botão
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;