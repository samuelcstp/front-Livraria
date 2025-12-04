// frontend/src/components/Header.jsx (MODIFICADO COM LÓGICA DE SESSÃO CONDICIONAL)

import React, { useEffect } from 'react'; // 💡 Importar useEffect
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 💡 Importar useLocation
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle'; 
import './Header.css';

const Header = () => {
  const location = useLocation(); // 💡 Hook para saber a rota atual
  const { user, logout, checkAuth } = useAuth(); // 💡 Incluir checkAuth
  const navigate = useNavigate();

  // Define quais rotas são de autenticação e devem IGNORAR a verificação de sessão
  const isAuthRoute = 
      location.pathname === '/login' ||
      location.pathname === '/register' ||
      location.pathname === '/forgot-password' ||
      location.pathname.startsWith('/reset-password'); 

  // 💡 LÓGICA DE VERIFICAÇÃO DE SESSÃO (Substitui o useEffect no AuthContext)
  useEffect(() => {
    // Se o usuário NÃO estiver em uma rota de autenticação, verifica o login
    if (!isAuthRoute) {
        checkAuth();
    }
  }, [isAuthRoute, checkAuth]); // Depende da rota e da função checkAuth (estável)

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>📚 Livraria</h1>
        </Link>
        
        <nav className="nav">
          {user ? (
            <>
              {/* Links de navegação logada */}
              <Link to="/" className="nav-link">Início</Link>
              <Link to="/livros" className="nav-link">Livros</Link>
              <Link to="/reviews" className="nav-link">Reviews</Link>
              
              <ThemeToggle />
              
              <div className="user-info">
                <span>Olá, {user.username || user.email}!</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Links de navegação deslogada (visível nas rotas de auth) */}
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Registrar</Link>
              
              <ThemeToggle />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;