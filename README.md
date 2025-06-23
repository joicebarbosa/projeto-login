# Sistema de Autenticação Completo com Node.js e React

Um sistema de autenticação robusto e responsivo, desenvolvido com Node.js no backend e React no frontend, focado em proporcionar uma experiência de usuário segura e moderna para login e registro.

## 📸 Screenshots

Aqui estão algumas capturas de tela do projeto:

### Tela de Login
![image](https://github.com/user-attachments/assets/534774ef-4fca-42a3-867c-80e30c8c3d19)

### Tela de Registro
![image](https://github.com/user-attachments/assets/2be93469-1141-4254-8cf0-4d2bc0f8e16a)

### Dashboard (Área Logada)
![image](https://github.com/user-attachments/assets/c0f3ac95-22e8-4065-a46e-22eab13d19ff)

## ✨ Features

* **Autenticação Completa:** Cadastro de novos usuários e login com credenciais.
* **Geração de Token JWT:** Segurança na comunicação entre frontend e backend, garantindo rotas protegidas.
* **Rotas Protegidas:** Acesso ao Dashboard e outras áreas restritas apenas para usuários autenticados.
* **Validação de Formulários:** Validação robusta e em tempo real de campos no frontend (nome, email, senha, confirmação de senha).
* **Design Responsivo:** Interface adaptável e otimizada para diferentes tamanhos de tela (desktop, tablet, mobile).
* **Interface Moderna:** Componentes estilizados com CSS puro, proporcionando uma experiência de usuário intuitiva e agradável.
* **Integração RESTful API:** Comunicação eficiente e segura entre o frontend e o backend via requisições HTTP.

## 🚀 Tecnologias Utilizadas

### Backend (Node.js)

* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para construir APIs RESTful.
* **TypeORM:** ORM (Object-Relational Mapper) para interagir com o banco de dados.
* **SQLite3:** Banco de dados relacional leve (ideal para desenvolvimento e projetos pequenos).
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática para um código mais robusto.
* **Bcrypt:** Biblioteca para hash de senhas de forma segura, protegendo as informações dos usuários.
* **JWT (JSON Web Tokens):** Padrão para criação de tokens de acesso seguros para autenticação.
* **Dotenv:** Para carregar variáveis de ambiente de um arquivo `.env`.
* **Nodemon:** Ferramenta que monitora alterações no código e reinicia o servidor automaticamente durante o desenvolvimento.

### Frontend (React)

* **React:** Biblioteca JavaScript declarativa para construção de interfaces de usuário reativas.
* **Vite:** Ferramenta de build frontend moderna e extremamente rápida.
* **TypeScript:** Para adicionar tipagem estática ao React, melhorando a manutenibilidade do código.
* **React Router DOM:** Coleção de componentes de roteamento para navegação declarativa na aplicação React.
* **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API de forma eficiente.
* **CSS Puro:** Estilização dos componentes sem a necessidade de frameworks CSS pesados, oferecendo total controle sobre o design.

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [Yarn](https://yarnpkg.com/)

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/joicebarbosa/projeto-login.git](https://github.com/joicebarbosa/projeto-login.git)
    cd projeto-login
    ```

2.  **Configuração do Backend:**
    Navegue até a pasta `backend`:
    ```bash
    cd backend
    ```
    Instale as dependências:
    ```bash
    npm install # ou yarn install
    ```
    Crie um arquivo `.env` na raiz da pasta `backend` e adicione as seguintes variáveis de ambiente:
    ```
    PORT=3000
    JWT_SECRET=sua_chave_secreta_jwt_aqui_exemplo # Use uma string longa e aleatória
    DATABASE_URL=./database.sqlite # Caminho para o seu arquivo SQLite
    ```
    Execute as migrations do TypeORM para criar o banco de dados e as tabelas:
    ```bash
    npm run typeorm migration:run # ou yarn typeorm migration:run
    ```
    Inicie o servidor de backend:
    ```bash
    npm run start:dev # Para desenvolvimento com reinício automático
    # ou npm start # Para execução normal
    ```
    O backend estará rodando em `http://localhost:3000`.

3.  **Configuração do Frontend:**
    Abra um **novo terminal** e navegue até a pasta `frontend`:
    ```bash
    cd frontend
    ```
    Instale as dependências:
    ```bash
    npm install # ou yarn install
    ```
    Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev # ou yarn dev
    ```
    O frontend estará acessível geralmente em `http://localhost:3001` (ou outra porta disponível).

## 💡 Como Usar

1.  Acesse o frontend no seu navegador (ex: `http://localhost:3001`).
2.  Você será redirecionado para a página de Login. Se não tiver uma conta, clique em "Cadastre-se aqui" para criar uma.
3.  Preencha o formulário de Registro com seus dados. As validações de campo o guiarão para um cadastro bem-sucedido.
4.  Após o registro, você será automaticamente redirecionado para a página de Login.
5.  Faça login com seu email e senha recém-registrados.
6.  Ao fazer login, você será levado ao Dashboard, a área protegida do sistema.
7.  Clique no botão "Sair" para realizar o logout e retornar à página de Login.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tiver sugestões de melhoria, novas funcionalidades para implementar ou encontrar algum bug, sinta-se à vontade para:

1. Abrir uma [Issue](https://github.com/joicebarbosa/projeto-login/issues) descrevendo a sua ideia ou o problema.
2. Criar um [Fork](https://github.com/joicebarbosa/projeto-login/fork) do projeto.
3. Criar uma nova `branch` para sua alteração (`git checkout -b feature/minha-nova-feature` ou `fix/correcao-de-bug`).
4. Fazer suas alterações e commitar (`git commit -m "feat: adiciona nova funcionalidade"`).
5. Enviar para o seu Fork (`git push origin feature/minha-nova-feature`).
6. Abrir um [Pull Request](https://github.com/joicebarbosa/projeto-login/pulls) para a branch `main` do repositório original.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` na raiz do projeto para mais detalhes.

---

Feito com ❤️ por **[Joice Barbosa/joicebarbosa]**
