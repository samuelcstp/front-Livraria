// frontend/src/services/reviewsService.js (CORRIGIDO)
import api from './api';

export const reviewsService = {
    // 1. Listar todas as reviews do usuário
    listar: async () => {
        // 🚀 CORREÇÃO: Removendo o '/api'. 
        // A requisição agora será: /api + /reviews/me = /api/reviews/me
        const response = await api.get('/reviews/me'); 
        return response.data;
    },

    // 2. Criar uma nova review (CORREÇÃO APLICADA AQUI TAMBÉM)
    criar: async (data) => {
        const response = await api.post('/reviews', data);
        return response.data;
    },
    
    // ... Corrija também 'atualizar' e 'remover' se necessário:
    atualizar: async (id, data) => {
        const response = await api.put(`/reviews/${id}`, data);
        return response.data;
    },

    remover: async (id) => {
        const response = await api.delete(`/reviews/${id}`);
        return response.data;
    }
};