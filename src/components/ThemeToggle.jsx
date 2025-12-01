// frontend/src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../App'; // Importa o hook do App.jsx

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-theme-toggle"
      // Usamos variáveis CSS aqui para que o botão se adapte ao tema
      style={{
        backgroundColor: 'var(--color-background-secondary)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        padding: '8px 12px',
        fontSize: '0.9em',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
    </button>
  );
};

export default ThemeToggle;