// frontend/src/components/ReviewForm.jsx (FINALMENTE PADRONIZADO PARA O BACKEND)
import React, { useState, useEffect } from 'react';
import { livrosService } from '../services/livrosService'; 
import './ReviewForm.css'; 

// Renomeamos a prop para propReview para evitar conflito com o campo 'review'
const ReviewForm = ({ review: propReview, onSubmit, onCancel }) => { 
    
    const [formData, setFormData] = useState({
        // 🚀 CORRIGIDO: livroId (CamelCase)
        livroId: propReview?.livroId || '', 
        nota: propReview?.nota || 5,         
        // 🚀 CORRIGIDO: review (Campo de texto, CamelCase)
        review: propReview?.review || ''       
    });
    const [livros, setLivros] = useState([]);
    const [loadingLivros, setLoadingLivros] = useState(true);

    useEffect(() => {
    const fetchLivros = async () => {
        try {
            const data = await livrosService.listar();
            setLivros(data);
            setLoadingLivros(false); // 🚀 Adicionar aqui para sucesso
        } catch (err) {
            console.error("Erro ao carregar livros para o formulário:", err);
            setLivros([]); // Garante que a lista não seja nula
            setLoadingLivros(false); // 🚀 Adicionar aqui para erro
        } 
    };
    fetchLivros();
}, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            nota: parseInt(formData.nota, 10)
        });
    };
    
    const isEditing = !!propReview;

    if (loadingLivros) {
        return <div className="loading">Carregando opções de livros...</div>;
    }

    return (
        <div className="review-form-overlay">
            <div className="review-form-container">
                <h2>{isEditing ? 'Editar Review' : 'Nova Review'}</h2>
                <form onSubmit={handleSubmit}>
                    
                    {/* SELEÇÃO DO LIVRO */}
                    <div className="input-group">
                        <label htmlFor="livroId">Livro *</label>
                        <select 
                            id="livroId" 
                            name="livroId" // 🚀 NAME: livroId
                            value={formData.livroId} 
                            onChange={handleChange} 
                            required 
                            disabled={isEditing}
                        >
                            <option value="" disabled>Selecione um livro</option>
                            {livros.map((livro) => (
                                <option key={livro.id} value={livro.id}>
                                    {livro.titulo} ({livro.autor})
                                </option>
                            ))}
                        </select>
                        {isEditing && <small>Não é possível mudar o livro em uma review existente.</small>}
                    </div>

                    {/* NOTA (permanece 'nota') */}
                    <div className="input-group">
                        <label htmlFor="nota">Nota (1 a 10) *</label>
                        <input
                            type="number"
                            id="nota"
                            name="nota"
                            value={formData.nota}
                            onChange={handleChange}
                            required
                            min="1"
                            max="10"
                        />
                    </div>

                    {/* TEXTO DA REVIEW */}
                    <div className="input-group">
                        <label htmlFor="review">Comentário</label>
                        <textarea
                            id="review"
                            name="review" // 🚀 NAME: review
                            value={formData.review} 
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-success">
                            {isEditing ? 'Atualizar' : 'Salvar'} Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;