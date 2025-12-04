// frontend/src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // 💡 NOVO ESTADO: Controla a visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 💡 FUNÇÃO: Alternar a visibilidade
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    // 💡 Adiciona validação de tamanho da senha (se não estiver no backend)
    if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/login');
    } catch (err) {
      // Usando 'err.message' se não houver 'err.response.data.erro'
      setError(err.message || 'Erro ao criar conta.'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registrar</h2>
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* 💡 CAMPO DE SENHA COM TOGGLE */}
          <div className="input-group password-group">
            <label htmlFor="password">Senha</label>
            <input
              // 💡 Tipo controlado pelo estado
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
            <button 
                type="button" 
                className="toggle-password-btn"
                onClick={handleTogglePassword}
                title={showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                disabled={loading}
            >
               {/* 💡 Emoji de Cadeado: 🔒 Ocultar / 🔓 Mostrar */}
               {showPassword ? '🔒' : '🔓'}
            </button>
          </div>

          {/* 💡 CAMPO DE CONFIRMAR SENHA COM TOGGLE */}
          <div className="input-group password-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              // 💡 Tipo controlado pelo estado
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
             <button 
                type="button" 
                className="toggle-password-btn"
                onClick={handleTogglePassword}
                title={showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                disabled={loading}
            >
               {/* 💡 Emoji de Cadeado: 🔒 Ocultar / 🔓 Mostrar */}
               {showPassword ? '🔒' : '🔓'}
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Criando conta...' : 'Registrar'}
          </button>
        </form>

        <p className="auth-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;