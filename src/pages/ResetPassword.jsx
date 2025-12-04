// frontend/src/pages/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import './Auth.css'; 

const ResetPassword = () => {
    const [searchParams] = useSearchParams(); 
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // 💡 NOVO ESTADO: Visibilidade da senha
    const [showPassword, setShowPassword] = useState(false); 
    
    const token = searchParams.get('token'); 

    useEffect(() => {
        if (!token) {
            setError('Token de redefinição não encontrado na URL.');
        }
    }, [token]);
    
    // 💡 NOVA FUNÇÃO: Alternar a visibilidade
    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!token) {
            setError('Token inválido ou ausente.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.resetPassword(token, password);
            setSuccess(response.mensagem);
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.message || 'Erro ao redefinir a senha. Tente novamente ou solicite um novo link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Redefinir Senha</h2>
                
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                {token && !success ? (
                    <form onSubmit={handleSubmit}>
                        
                        {/* 💡 CAMPO DE NOVA SENHA COM TOGGLE */}
                        <div className="input-group password-group">
                            <label htmlFor="password">Nova Senha</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                            {/* 💡 BOTÃO DE VISUALIZAÇÃO */}
                            <button 
                                type="button" 
                                className="toggle-password-btn"
                                onClick={handleTogglePassword}
                                title={showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                                disabled={loading}
                            >
                                {showPassword ? '🔓' : '🔒'}
                            </button>
                        </div>
                        
                        {/* 💡 CAMPO DE CONFIRMAÇÃO DE SENHA COM TOGGLE */}
                        <div className="input-group password-group">
                            <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                             {/* 💡 BOTÃO DE VISUALIZAÇÃO */}
                            <button 
                                type="button" 
                                className="toggle-password-btn"
                                onClick={handleTogglePassword}
                                title={showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                                disabled={loading}
                            >
                                {showPassword ? '🔓' : '🔒'}
                            </button>
                        </div>
                        
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                        </button>
                    </form>
                ) : (
                    !success && <p className="auth-link">Por favor, use o link completo enviado por e-mail.</p>
                )}
                
                <p className="auth-link">
                    <Link to="/login">Voltar para o Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;