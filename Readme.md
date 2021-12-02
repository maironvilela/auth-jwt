<h1 align="center">
     Autenticação com JWT    
 </h1>
 <p align="center">
  <a href="#sobre-o-projeto">Sobre o Projeto</a> |
  <a href="#tecnologias">Tecnologias</a> | 
  <a href="#pré-requisitos">Pré-Requisitos</a> |
  <a href="#executando-a-aplicação">Executando a aplicação</a>   |
  <a href="#rotas-api">Rotas API</a> |     
  <a href="#observações">Observações</a> |     


 </p> 
 
## Sobre o Projeto
 O projeto consiste na criação de um sistema para realizar a autenticação e autorização dos usuários.

 Tem como principais funcionalidades:

 > Autenticar usuário do sistema

 > Implementação JWT 

 > Decodificação do JWT

 > Autorização para visualização de componentes

 > Autorização para acesso as paginas
 
 > Utilização do BroadcastChannel para interação entre as abas do navegador

## Tecnologias

[![Javascript](https://img.shields.io/badge/Code-Javascript-FFFF00?&logo=javascript&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) 
[![NextJS](https://img.shields.io/badge/Code-NextJS-000000?&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Typescript](https://img.shields.io/badge/Code-Typescript-1E90FF?&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[![Styled Components](https://img.shields.io/badge/Styles-Styled_Components-FF69B4?&logo=styled-components&logoColor=white)](https://styled-components.com/) 

[![Swagger](https://img.shields.io/badge/Documentation-Swagger-green?&logo=Swagger&logoColor=white)](https://swagger.io) 

 [![Express](https://img.shields.io/badge/Server-Express-000?&logo=express&logoColor=white)](https://expressjs.com/pt-br/) 
 
[![Nookies](https://img.shields.io/badge/Nookies-v2.5.2-blue?&logo=gitbook&logoColor=white)](https://www.npmjs.com/package/nookies)
[![Axios](https://img.shields.io/badge/Axios-v0.24.0-blue?&logo=gitbook&logoColor=white)](https://www.npmjs.com/package/axios) 

## Pré-Requisitos
1. Instalação GIT
2. Instalação NodeJS
3. Instalação gerenciador de pacotes yarn ou npm
 
## Executando a aplicação

1. Realize o clone do projeto
    ```bash
    git clone https://github.com/maironvilela/auth-jwt.git
    ```
2. Acesse o diretório principal do projeto
    ```bash
    cd auth-jwt
    ``` 
3. Acesse o diretorio do backend e execute e inicie o servidor
     ```bash
      cd backend 
      yarn dev
      ```
4. Acesse o diretorio frontend e inicie o servidor
      ```bash
      cd frontend 
      yarn dev
      ```
5. Acesse o projeto através da url: [**http://localhost:3000**](http://localhost:3000) 


## Rotas API

>#### POST /sessions

 **Request**
     
     {
        email: string
        password: string
     }
    
     
**Response**
 
     {
       "token": string",
       "refreshToken": "string",
       "permissions": string[],
       "roles": string[]
     }
     
#### POST /refresh

> **Request**
 
 *Obs: Necessário enviar o token no header da requisição*

          
     {
        refreshToken: string         
     }
     
 > **Response**
 
     {
       "token": string",
       "refreshToken": "string",
       "permissions": string[],
       "roles": string[]
     }
     
#### GET /me

 > **Request**
 
 *Obs: Necessário enviar o token no header da requisição*         
   
     
> **Response**
 
     {
       "email": string",
       "permissions": string[],
       "roles": string[]
     }
 

Para visualizar a documentação completa da API, após iniciar o servidor do Backend, acesse a url: [http://localhost:3333/api-docs/](http://localhost:3333/api-docs/)
 

## Observações

- Backend desenvolvido de forma statica
 

 
