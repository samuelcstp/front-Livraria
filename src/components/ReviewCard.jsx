// frontend/src/components/ReviewCard.jsx
import React from 'react';
import './ReviewCard.css'; // Crie este CSS depois

// 🚀 CORRIGIDO: Agora recebe o objeto 'livro' completo, não apenas o título.
const ReviewCard = ({ review, livro, onEdit, onDelete }) => {
    
    // Desestrutura o que precisamos do objeto livro
    const { titulo, capa_url } = livro; 
    
    const renderStars = (nota) => {
        // Arredonda para o número de estrelas cheias (máx 5)
        const fullStars = '⭐'.repeat(Math.round(nota / 2)); 
        const emptyStars = '☆'.repeat(5 - Math.round(nota / 2));
        return fullStars + emptyStars;
    };

    return (
        <div className="review-card">
            
            <div className="review-content">
                
                {/* 🚀 Adiciona a Imagem da Capa */}
                {capa_url && (
                    <img 
                        src={capa_url} 
                        alt={`Capa do livro ${titulo}`} 
                        className="book-cover" 
                        // Exemplo de placeholder para garantir que algo apareça
                        onError={(e) => { e.target.onerror = null; e.target.src="http://googleusercontent.com/image_collection/image_retrieval/some_id_string" }}
                    />
                )}
                
                <div className="review-details">
                    {/* 🚀 Usa o título do objeto livro */}
                    <h3>{titulo}</h3> 
                    
                    <div className="review-rating">
                        <span className="stars">{renderStars(review.nota)}</span>
                        <span className="score">({review.nota}/10)</span>
                    </div>
                    
                    {/* 🚀 CORRIGIDO: Exibe review.review para o texto */}
                    <p className="review-text">{review.review || 'Nenhum comentário adicionado.'}</p> 
                </div>

            </div>
            
            <div className="card-actions">
                <button onClick={() => onEdit(review)} className="btn btn-primary btn-sm">
                    ✏️ Editar
                </button>
                <button onClick={() => onDelete(review.id)} className="btn btn-danger btn-sm">
                    🗑️ Remover
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;