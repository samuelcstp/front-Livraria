// frontend/src/components/LivroCard.jsx (CONFIRMANDO A LÓGICA)
import React from 'react';
import './LivroCard.css';

const BACKEND_BASE_URL = 'http://localhost:3333'; 

const LivroCard = ({ livro, onEdit, onDelete }) => {
  
  // Condição: Usa o caminho do backend SOMENTE se a string não for vazia, null, ou undefined.
  const isCapaPresente = livro.capa_caminho && livro.capa_caminho.length > 0;
  
  const capaSrc = isCapaPresente
    ? `${BACKEND_BASE_URL}/${livro.capa_caminho}`
    : '/images/placeholder-cover.png';

  const handleImageError = (e) => {
    // Garante que o handler de erro não crie um loop infinito
    e.target.onerror = null; 
    // Define a imagem de fallback para o caso de a URL do servidor falhar
    e.target.src = '/images/placeholder-cover.png'; 
  };

  return (
    <div className="livro-card">
      <div className="livro-capa">
        <img 
          src={capaSrc} 
          alt={`Capa do livro ${livro.titulo}`}
          onError={handleImageError} // Usa a função de tratamento de erro
        />
      </div>

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