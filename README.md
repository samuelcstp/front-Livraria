### 🏗️ Arquitetura e Componentes Chave

A aplicação utiliza **React** com **Vite** e a **Context API** para gerenciamento de estado global.

---

### 🧩 Contextos e Serviços

- **contexts/AuthContext.jsx**: Gerencia o estado global do usuário (`user`) e todas as funções de autenticação.
- **contexts/ThemeContext.jsx**: Controla o estado do tema (`light/dark`) e persiste a escolha no `localStorage`.
- **services/authService.js**: Centraliza todas as chamadas de API para o backend relacionadas à autenticação e recuperação.

---

### Componentes de UI e Navegação

- **components/Header.jsx**: Barra de navegação dinâmica. Essencialmente, é o ponto de controle de sessão na aplicação.
- **components/PrivateRoute.jsx**: Componente que protege rotas.
- **components/ThemeToggle.jsx**: Botão que alterna o tema visual da aplicação.

---

### Páginas de Conteúdo (Core Functionalities)

- **pages/Home.jsx**: Página principal da aplicação.

- **pages/Livros.jsx**:  
  Lista e gerencia os registros de livros.  
  Permite a navegação para visualização ou edição de um livro específico.

- **pages/Reviews.jsx**:  
  Exibe uma lista de todas as avaliações e comentários feitos por usuários.  
  Interface para a interação do usuário com o conteúdo da livraria.

---

### Páginas de Autenticação

- **pages/Login.jsx / pages/Register.jsx**: Formulários com manipulação de erros e toggle de visibilidade de senha.
- **pages/ForgotPassword.jsx / pages/ResetPassword.jsx**: Implementam o fluxo completo de recuperação, do envio de e-mail à atualização da senha via token de URL.

---
