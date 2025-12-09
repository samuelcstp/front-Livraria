## Estrutura do Frontend
SPA em **React + Vite**, com estados globais para autenticação e tema.

### `src/contexts`
- **AuthContext.jsx**  
  Gerencia o usuário logado e expõe funções de autenticação, logout, recuperação etc.

- **ThemeContext.jsx**  
  Alterna entre *light* e *dark*, salvando a escolha no `localStorage`.

### `src/components`
- **Header.jsx**  
  Navegação dinâmica. Executa `checkAuth` de forma segura para não quebrar rotas sensíveis.

- **PrivateRoute.jsx**  
  Protege rotas. Redireciona usuários deslogados para o login.

- **ThemeToggle.jsx**  
  Botão que alterna o tema visual.

### `src/pages` (principais)
- **Login.jsx**  
  Formulário de login com ver senha e link para esqueci minha senha.

- **Register.jsx**  
  Registro com validação cruzada de senha.

- **ResetPassword.jsx**  
  Extrai o token da URL (`searchParams`) e permite definir uma nova senha.

### `src/services`
- **authService.js**  
  Centraliza todas as chamadas HTTP para o backend, mantendo os componentes limpos
