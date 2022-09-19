# Shared Knowledge

Shared Knowledge é um pequeno projeto para praticar desenvolvimento full-stack com tecnologias e ferramentas atuais. Resolvi dividir o pojeto em 2 repositórios, um para o back-end e outro para o front-end. Você está vendo o repositório **back-end**. [Clique aqui para ver o repositório front-end](https://github.com/JomaSnow/shared_knowledge_frontend).

## Sobre o projeto

A ideia do projeto é construir uma página web na qual a cada alguns segundos uma mensagem inspiradora, conhecimento, ditado, ou algum outro pequeno texto apareçam na tela para serem compartilhados com o mundo. O site deve ter uma página inicial para exibir as mensagens, uma página para falar sobre o projeto e linkar para o github, uma página para fazer login ou criar conta, uma página para editar informações da conta e uma página para criar, editar, deletar e visualizar suas mensagens. Existe, ainda, uma página para administradores gerenciarem todas as mensagens e usuários cadastrados.

Qualquer visitante da página pode acessar e ler as mensagens do site, mas apenas Usuários autenticados podem postar mensagens. Usuários comuns podem criar novas mensagens, deletar e atualizar apenas as suas próprias e visualizar todas; eles não podem ver, criar, editar nem deletar outros usuários, além deles mesmos. Usuários administradores podem criar, visualizar, editar e apagar quaisquer mensagens; e podem também visualizar, editar e apagar qualquer usuário.

### Objetivos do back-end

Os objetivos maiores do projeto por parte do back-end são:
  - Utilizar Docker para cuidar do Banco de Dados;
    - Criar container rodando PostgreSQL
  - Aprender Nest JS;
    - Criar CRUDs básicos
    - Criar relacionamentos
    - Tratar erros HTTP
    - Utilizar criptografia para as senhas
    - Utilizar JWT para o login
  - Aprender Prisma;
    - Conectar com o banco
    - Criar migrações
    
### Recursos utilizados

Alguns vídeos e guias que ajudaram no desenvolvimento deste projeto:
- [Docker and PostgreSQL in [10 Minutes] - vídeo](https://www.youtube.com/watch?v=aHbE3pTyG-Q)
- [Criando uma aplicação com NestJS e PrismaIO - vídeo](https://www.youtube.com/watch?v=0Idug0e9tPw)
- [AUTENTICAÇÃO COM JWT NO NESTJS - vídeo](https://www.youtube.com/watch?v=jMprSQlDLGo)
- [Hash de senha no Prisma - stackoverflow](https://stackoverflow.com/questions/69233726/cannot-hash-the-users-password-with-prisma-middleware-in-nestjs-on-create-user)
- [HTTP Status Codes Cheat Sheet - blog](https://cheatography.com/kstep/cheat-sheets/http-status-codes/)
- [Controllers no NestJS - documentação](https://docs.nestjs.com/controllers)
- [Usando Prisma no NestJS - documentação](https://docs.nestjs.com/recipes/prisma)
- [Relacionamentos no Prisma](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

### Aprendizados

O que aprendi, técnicas e comandos, durante esse projeto (para o João do futuro consultar, de nada futuro eu):

### Como executar o projeto localmente

Pré-requisito ter instalado Docker, NPM e Yarn.

1. Criar e executar container rodando postgres
2. Clonar repositório
3. Rodar *yarn* para instalar dependências
4. Rodar *yarn prisma migrate dev* para criar o banco de dados de fato
5. Rodar *yarn prisma generate* para gerar os arquivos do schema no TypeScript 
6. Criar ou editar arquivo .env com a url do banco de dados (utilizar login e senha usados no container) e 'JWT_SECRET' com alguma chave (ex: *openssl rand -base64 30*)
7. Rodar *yarn start*

