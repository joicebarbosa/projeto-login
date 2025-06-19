// frontend/src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  // Você pode adicionar mais props aqui se precisar, como roles/permissões
}

export const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  // Verifica se o accessToken existe no localStorage
  const isAuthenticated = localStorage.getItem('accessToken');

  // Se o usuário estiver autenticado, renderiza o componente filho (Outlet)
  // Caso contrário, redireciona para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};