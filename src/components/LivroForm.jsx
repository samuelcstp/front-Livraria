// frontend/src/components/LivroForm.jsx (AJUSTADO)
import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
  // 💡 Inicialização Segura com Optional Chaining (livro?.prop)
  const [formData, setFormData] = useState({
    titulo: livro?.titulo || '',
    autor: livro?.autor || '',
    categoria: livro?.categoria || '', // 👈 CAMPO CRÍTICO ADICIONADO
    ano: livro?.ano || '',
    editora: livro?.editora || '',
    capa_url: livro?.capa_url || '' // CAMPO URL ADICIONADO
  });

  useEffect(() => {
    // 💡 Usa useEffect apenas para re-popular se 'livro' mudar
    if (livro) {
      setFormData({
        titulo: livro.titulo || '',
        autor: livro.autor || '',
        categoria: livro.categoria || '', // 👈 CAMPO CRÍTICO NO UPDATE
        ano: livro.ano || '',
        editora: livro.editora || '',
        capa_url: livro.capa_url || ''
      });
    }
    // Não precisa de 'else' pois o estado inicial já usa o livro, se existir.
  }, [livro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="livro-form-overlay">
      <div className="livro-form-container">
        <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
        <form onSubmit={handleSubmit}>
          
          {/* TÍTULO */}
          <div className="input-group">
            <label htmlFor="titulo">Título *</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>

          {/* AUTOR */}
          <div className="input-group">
            <label htmlFor="autor">Autor *</label>
            <input type="text" id="autor" name="autor" value={formData.autor} onChange={handleChange} required />
          </div>

          {/* 👈 CAMPO CATEGORIA ADICIONADO */}
          <div className="input-group">
            <label htmlFor="categoria">Categoria *</label>
            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
          </div>
          {/* FIM CAMPO CATEGORIA */}

          {/* ANO */}
          <div className="input-group">
            <label htmlFor="ano">Ano *</label>
            <input
              type="number"
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              required
              min="1000"
              max="9999"
            />
          </div>

          {/* EDITORA */}
          <div className="input-group">
            <label htmlFor="editora">Editora</label>
            <input type="text" id="editora" name="editora" value={formData.editora} onChange={handleChange} />
          </div>

          {/* URL DA CAPA */}
          <div className="input-group">
            <label htmlFor="capa_url">URL da Capa</label>
            <input type="url" id="capa_url" name="capa_url" value={formData.capa_url} onChange={handleChange} placeholder="Ex: http://sitedeimagem.com/capa.jpg" />
          </div>
          {/* FIM URL DA CAPA */}


          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              {livro ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivroForm;