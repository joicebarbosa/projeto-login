// frontend/src/main.tsx (ou App.tsx, dependendo de onde suas rotas estão)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Importe Navigate
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/index.css'; // Seu CSS global

// Componente de Dashboard simples para testar
const DashboardPage: React.FC = () => {
  // Exemplo de como pegar o token para exibir ou usar
  const token = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('userName'); // Se você for armazenar o nome tbm

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    // Opcional: remover outros dados do usuário
    localStorage.removeItem('userName');
    window.location.href = '/login'; // Redireciona para login
  };

  if (!token) {
    // Se não houver token, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bem-vindo, {userName || 'Usuário'}!</h1>
      <p>Você está logado e pode acessar conteúdo protegido.</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Sair
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* Rota padrão */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);