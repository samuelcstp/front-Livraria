// frontend/src/components/LivroForm.jsx (COM UPLOAD DE ARQUIVO)
import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
  // 💡 1. Estado para dados de texto (mantido)
  const [formData, setFormData] = useState({
    titulo: livro?.titulo || '',
    autor: livro?.autor || '',
    categoria: livro?.categoria || '',
    ano: livro?.ano || '',
    editora: livro?.editora || '',
    // Removido capa_url do formData de texto
  });

  // 💡 2. NOVO ESTADO: Para armazenar o OBJETO File selecionado
  const [capaFile, setCapaFile] = useState(null); 
  
  // 💡 3. Estado opcional para exibir o caminho da capa existente (se for edição)
  const [existingCapaCaminho, setExistingCapaCaminho] = useState(livro?.capa_caminho || null);

  useEffect(() => {
    if (livro) {
      setFormData({
        titulo: livro.titulo || '',
        autor: livro.autor || '',
        categoria: livro.categoria || '',
        ano: livro.ano || '',
        editora: livro.editora || '',
      });
      // 💡 Atualiza o caminho existente (se houver)
      setExistingCapaCaminho(livro.capa_caminho || null);
    }
  }, [livro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 💡 NOVO HANDLER para o input file
  const handleFileChange = (e) => {
    // Pega o primeiro arquivo do FileList
    setCapaFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 💥 MÁGICA DO UPLOAD: Cria o objeto FormData
    const dataToSend = new FormData();

    // 1. Adiciona todos os campos de texto
    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key]);
    });

    // 2. Adiciona o arquivo, se um novo foi selecionado
    if (capaFile) {
        // O nome 'capaFile' DEVE ser o mesmo usado no Multer (upload.single('capaFile'))
        dataToSend.append('capaFile', capaFile); 
    }
    
    // O backend (controller) já sabe se é UPDATE ou CREATE,
    // mas o onSubmit agora envia o objeto FormData
    onSubmit(dataToSend); 
  };

  return (
    <div className="livro-form-overlay">
      <div className="livro-form-container">
        <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
        <form onSubmit={handleSubmit}>
          
          {/* ... Campos de Título, Autor, Categoria, Ano, Editora (Mantidos) ... */}
          <div className="input-group">
            <label htmlFor="titulo">Título *</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="autor">Autor *</label>
            <input type="text" id="autor" name="autor" value={formData.autor} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="categoria">Categoria *</label>
            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
          </div>

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

          <div className="input-group">
            <label htmlFor="editora">Editora</label>
            <input type="text" id="editora" name="editora" value={formData.editora} onChange={handleChange} />
          </div>
          
          {/* 💡 NOVO INPUT DE ARQUIVO */}
          <div className="input-group">
            <label htmlFor="capaFile">Capa do Livro {livro ? '(Selecione para mudar)' : ''}</label>
            <input 
              type="file" 
              id="capaFile" 
              name="capaFile" // Nome do campo
              accept="image/*" // Aceita apenas imagens
              onChange={handleFileChange} 
            />
            {/* Exibe o nome do arquivo selecionado ou o caminho existente */}
            {(capaFile && <small>Arquivo selecionado: **{capaFile.name}**</small>) ||
             (existingCapaCaminho && <small>Capa existente salva: **{existingCapaCaminho}**</small>)}
          </div>
          {/* FIM INPUT DE ARQUIVO */}


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