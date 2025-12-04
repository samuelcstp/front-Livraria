// frontend/src/App.jsx (VERSÃO FINAL E LIMPA)

import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' 
import { AuthProvider } from './contexts/AuthContext' 
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'

// PÁGINAS EXISTENTES
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Livros from './pages/Livros'
import Reviews from './pages/Reviews'

// NOVAS PÁGINAS DE RECUPERAÇÃO
import ForgotPassword from './pages/ForgotPassword' 
import ResetPassword from './pages/ResetPassword' 

import './App.css'

// -----------------------------------------------------------
// 1. CONTEXTO E HOOK DE TEMA (MANTIDO)
// -----------------------------------------------------------
const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('color-theme');
    if (storedTheme) {
      return storedTheme;
    }
    const userPrefersDark = window.matchMedia && 
                           window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  }
  return 'light';
};

// Componente Provedor de Tema (TOP LEVEL)
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('color-theme', theme);
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para fácil consumo
export const useTheme = () => useContext(ThemeContext); 

// -----------------------------------------------------------
// 2. COMPONENTE APP (FINAL)
// -----------------------------------------------------------
function App() {
  return (
    <ThemeProvider> 
      <AuthProvider>
        <Router>
          <div className="app">
            
            {/* 💡 HEADER AGORA É INCONDICIONAL, MAS sua lógica de checkAuth é condicional */}
            <Header /> 
            
            <main className="main-content">
              <Routes>
                
                {/* ROTAS PÚBLICAS */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* ROTAS PROTEGIDAS */}
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/livros" element={<PrivateRoute><Livros /></PrivateRoute>} />
                <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
                
                {/* Fallback para qualquer outra rota */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App