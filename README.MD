# TechBlog Grão Direto

Aqui você encontrará um projeto fullstack que consiste em um backend desenvolvido com **Node.js**, **NestJS**, **Prisma** e **MySQL**, e um frontend construído com **React**. Siga as instruções abaixo para configurar e rodar o projeto.

## Pré-requisitos

Certifique-se de ter instalado:
- [Git](https://git-scm.com/) (para clonar o repositório)
- [Node.js](https://nodejs.org/) (v20 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gerenciadores de pacotes)
- [MySQL](https://www.mysql.com/) (ou outro banco de dados compatível com Prisma)

## Configuração do Projeto
### 1. Clonar o repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/lanesgabriel/techBlog_graoDireto.git
cd techBlog_graoDireto
```

### 2. Configurar o Backend
Navegue até a pasta do backend e instale as dependências:

```bash
cd tech-blog_backend
npm install
```

#### Configurar o banco de dados
Crie um banco de dados MySQL localmente:
```bash
mysql -u root -p
CREATE DATABASE nome_do_banco;
SHOW DATABASES;
exit;
```

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente:
```bash
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
```

#### Execute as migrações do Prisma para criar as tabelas no banco de dados:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Popular o banco com os dados iniciais
Execute o comando abaixo para realizar o seed a partir do Prisma:
```bash
npx prisma db seed
```

#### Iniciar o servidor
Inicie o servidor em modo de desenvolvimento
```bash
npm run start:dev
```

Ele estará rodando em http://localhost:3000.

### 3. Configurar o Frontend
#### Instalar dependências
Navegue até a pasta do frontend e instale as dependências:

```bash
cd ../tech-blog_frontend
npm install
```

#### Configurar a URL do backend
Certifique-se que a configuração do axios em api.js está apontando para a URL correta a depender do seu endereço de backend:
```js
const api = axios.create({
  baseURL: 'http://localhost:3000',
});
```

#### Iniciar servidor frontend
```bash
npm start
```

Pronto, o projeto estará rondando na sua máquina!