import React, { createContext, useState, useContext, useMemo } from 'react'; 
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const checkAuth = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    // Não faz login automático após o registro
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  //Solicita link de recuperação
  const forgotPassword = async (email) => {
    return authService.forgotPassword(email);
  };

  //Redefine a senha com token
  const resetPassword = async (token, newPassword) => {
    return authService.resetPassword(token, newPassword);
  };

  const contextValue = useMemo(() => ({
    user, 
    loading, 
    login, 
    register, 
    logout, 
    checkAuth,
    forgotPassword, 
    resetPassword  
  }), [user, loading]); 


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};