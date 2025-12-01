import api from './api';

export const livrosService = {
    async listar() {
        const response = await api.get('/livros');
        return response.data;
    },

    async buscarPorId(id) {
        const response = await api.get(`/livros/${id}`);
        return response.data;
    },

    async criar(formData) {
        // 💡 MODIFICADO: Recebe FormData e configura o header para upload
        // O `formData` é o objeto FormData nativo.
        
        // console.log(formData); // O FormData não pode ser logado diretamente com console.log, use para debug
        
        const response = await api.post('/livros', formData, {
            headers: {
                // 💥 ESSENCIAL: Diz ao backend que os dados contêm arquivos
                'Content-Type': 'multipart/form-data' 
            },
        });
        return response.data;
    },

    async atualizar(id, formData) {
        // 💡 MODIFICADO: Recebe FormData e configura o header para upload
        // Usamos PUT/PATCH aqui, embora alguns setups de Multer prefiram PATCH.
        const response = await api.put(`/livros/${id}`, formData, {
            headers: {
                // 💥 ESSENCIAL: Garante o processamento do arquivo pelo Multer
                'Content-Type': 'multipart/form-data' 
            },
        });
        return response.data;
    },

    async remover(id) {
        const response = await api.delete(`/livros/${id}`);
        return response.data;
    }
};