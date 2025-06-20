// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Importa como default (sem chaves)
import RegisterPage from './pages/RegisterPage'; // Importa como default (sem chaves)
import { PrivateRoute } from './components/PrivateRoute'; // PrivateRoute usa export const
import { logoutUser } from './api/auth'; // Importa a função de logout do auth.ts como named export
import './styles/index.css'; 
import './styles/AuthPages.css'; // Importa o CSS de estilos comuns

// Componente de Dashboard para conteúdo logado
const DashboardPage: React.FC = () => {
  const userName = localStorage.getItem('userName'); 

  const handleLogout = () => {
    logoutUser(); 
  };

  return (
    <div className="auth-page-container"> {/* Mantém o container para o background e centralização */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px auto', 
        color: '#fff', 
        fontSize: '1.2em'
      }}>
        <h1>Bem-vindo, {userName || 'Usuário'}!</h1>
        <p>Você está logado e pode acessar conteúdo protegido.</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            padding: '10px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

// Componente principal que define as rotas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rotas Protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Redireciona qualquer rota não correspondida para /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Exporta App como default