import api from './api';

export const authService = {
    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    async getMe() {
        const response = await api.get('/auth/me');
        return response.data;
    },
    
    async forgotPassword(email) {
        // Envia o email no corpo da requisição POST
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Rota PUT /auth/reset-password: Envia o token e a nova senha
    async resetPassword(token, newPassword) {
        // Envia o token e a nova senha no corpo da requisição PUT
        const response = await api.put('/auth/reset-password', { token, newPassword });
        return response.data;
    }
};