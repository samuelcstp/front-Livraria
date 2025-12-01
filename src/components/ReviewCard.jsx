// frontend/src/components/ReviewCard.jsx
import React from 'react';
import './ReviewCard.css'; // Crie este CSS depois

// 💡 URL BASE DO SEU BACKEND (Deve ser a mesma usada no LivroCard.jsx)
const BACKEND_BASE_URL = 'http://localhost:3333'; 

const ReviewCard = ({ review, livro, onEdit, onDelete }) => {
    
    // 🛑 AJUSTE CRÍTICO 1: Desestrutura a nova propriedade capa_caminho
    const { titulo, capa_caminho } = livro; 

    // 🛑 AJUSTE CRÍTICO 2: Monta a URL completa para a imagem
    const capaSrc = capa_caminho 
      ? `${BACKEND_BASE_URL}/${capa_caminho}`
      : '/images/placeholder-cover.png'; // Fallback

    const handleImageError = (e) => {
        // Fallback em caso de erro de carregamento (ex: arquivo deletado no servidor)
        e.target.onerror = null; 
        e.target.src = '/images/placeholder-cover.png';
    };
    
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
                {/* O check é feito com base no capaSrc, que tem o fallback */}
                <img 
                    src={capaSrc} 
                    alt={`Capa do livro ${titulo}`} 
                    className="book-cover" 
                    onError={handleImageError} // Usa o handler de erro
                />
                
                <div className="review-details">
                    <h3>{titulo}</h3> 
                    
                    <div className="review-rating">
                        <span className="stars">{renderStars(review.nota)}</span>
                        <span className="score">({review.nota}/10)</span>
                    </div>
                    
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