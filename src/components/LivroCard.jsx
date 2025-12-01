// frontend/src/components/LivroCard.jsx (AJUSTADO E LIMPO)
import React from 'react';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete }) => {
  return (
    <div className="livro-card">
      
      {/* Imagem da Capa: Só renderiza se houver URL válida */}
      {livro.capa_url && (
        <div className="livro-capa">
          <img 
            src={livro.capa_url} 
            alt={`Capa do livro ${livro.titulo}`} 
          />
        </div>
      )}

      <h3>{livro.titulo}</h3>
      
      <p><strong>Categoria:</strong> {livro.categoria}</p>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Ano:</strong> {livro.ano}</p>
      
      {livro.editora && <p><strong>Editora:</strong> {livro.editora}</p>}
      
      <div className="card-actions">
        <button onClick={() => onEdit(livro)} className="btn btn-primary">
          ✏️ Editar
        </button>
        <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
          🗑️ Remover
        </button>
      </div>
    </div>
  );
};

export default LivroCard;