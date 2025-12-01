// frontend/src/pages/Reviews.jsx
import React, { useState, useEffect } from 'react';
import { reviewsService } from '../services/reviewsService';
import { livrosService } from '../services/livrosService'; // Para buscar o título do livro
import ReviewCard from '../components/ReviewCard'; // Vamos criar este
import ReviewForm from '../components/ReviewForm'; // Acabamos de criar
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [livros, setLivros] = useState({}); // Para mapear livro_id para título
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Carregar Reviews e a lista de Livros para contexto
  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Carregar Reviews
      const reviewsData = await reviewsService.listar();
      setReviews(reviewsData);

      // Carregar Livros para mapeamento de ID (Necessário para o ReviewCard)
      const livrosData = await livrosService.listar();
      const livrosMap = livrosData.reduce((acc, livro) => {
        acc[livro.id] = {
            titulo: livro.titulo,
            autor: livro.autor,
            capa_url: livro.capa_url // 👈 Incluindo a URL
        };
        return acc;
      }, {});
      setLivros(livrosMap);

    } catch (err) {
      setError('Erro ao carregar reviews ou livros.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingReview(null);
    setShowForm(true);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta review?')) {
      return;
    }

    try {
      await reviewsService.remover(id);
      showSuccess('Review removida com sucesso!');
      carregarTudo(); // Recarrega reviews e livros
    } catch (err) {
      setError('Erro ao remover review.');
      console.error(err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingReview) {
        await reviewsService.atualizar(editingReview.id, formData);
        showSuccess('Review atualizada com sucesso!');
      } else {
        await reviewsService.criar(formData);
        showSuccess('Review criada com sucesso!');
      }
      setShowForm(false);
      setEditingReview(null);
      carregarTudo(); // Recarrega reviews e livros
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao salvar review.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return <div className="loading">Carregando reviews...</div>;
  }

  return (
    <div className="container">
      <div className="reviews-header">
        <h1>Minhas Reviews</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          ⭐ Escrever Review
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma review cadastrada ainda.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            Escrever sua primeira review
          </button>
        </div>
      ) : (
     <div className="reviews-list">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              // 🚀 PASSA o objeto de livro que inclui título e capa
              livro={livros[review.livro_id] || { titulo: 'Livro Desconhecido', capa_url: null }} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ReviewForm
          // 🚀 AJUSTE: Passar a review com livroId e review (se o backend retornar assim)
          review={editingReview} 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Reviews;