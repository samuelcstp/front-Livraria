// frontend/src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Assumindo que você tem um authService onde a função foi adicionada
import { authService } from '../services/authService'; 
import './Auth.css'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Chama a rota do backend para enviar o link
            const response = await authService.forgotPassword(email);
            
            // O backend retorna uma mensagem de sucesso, mesmo que o email não exista (segurança)
            setSuccess(response.mensagem);

        } catch (err) {
            // O erro 400 ou 500 será capturado aqui
            setError(err.message || 'Erro ao processar a solicitação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Recuperar Senha</h2>
                <p>Insira seu endereço de e-mail para receber um link de redefinição.</p>

                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                {!success && (
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar Link'}
                        </button>
                    </form>
                )}
                
                <p className="auth-link">
                    Lembrou da senha? <Link to="/login">Fazer Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;