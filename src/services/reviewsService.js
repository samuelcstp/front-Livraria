import api from './api';

export const reviewsService = {
    listar: async () => {
        const response = await api.get('/reviews/me'); 
        return response.data;
    },

    criar: async (data) => {
        const response = await api.post('/reviews', data);
        return response.data;
    },
    
    atualizar: async (id, data) => {
        const response = await api.put(`/reviews/${id}`, data);
        return response.data;
    },

    remover: async (id) => {
        const response = await api.delete(`/reviews/${id}`);
        return response.data;
    }
};