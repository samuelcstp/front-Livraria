// frontend/src/App.jsx (CORRIGIDO)

import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Livros from './pages/Livros'
import Reviews from './pages/Reviews'
import './App.css'
// ⚠️ Nota: A lógica CSS de tema deve ser adicionada ao seu App.css!

// -----------------------------------------------------------
// 1. CONTEXTO E HOOK DE TEMA (ESTES DEVEM ESTAR NO TOPO DO ARQUIVO!)
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

  // Efeito para persistir o tema e aplicar a classe CSS
  useEffect(() => {
    localStorage.setItem('color-theme', theme);
    
    // Aplica a classe CSS no elemento <html>
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

// Hook customizado para fácil consumo (TOP LEVEL)
export const useTheme = () => useContext(ThemeContext); // 👈 Deve estar aqui!

// -----------------------------------------------------------
// 2. COMPONENTE APP
// -----------------------------------------------------------
function App() {
  return (
    <ThemeProvider> 
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/livros" element={<PrivateRoute><Livros /></PrivateRoute>} />
                <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
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