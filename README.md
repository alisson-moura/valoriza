<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/alisson-moura/uai-food">
    <h1>Valoriza API </h1>
  </a>

  <p align="center">
    Uma API para enviar e receber elogios dos seus colegas/colaboradores.
  </p>
</p>

<details open="open">
  <summary>Tabela de Conteúdos</summary>
  <ol>
   <li><a href="#pré-requisitos">Pré-requisitos</a></li>
    <li><a href="#clonando-o-repositório">Clonando o repositório</a></li>
    <li><a href="#testes-unitários">Testes unitários</a></li>
    <li><a href="#acessando-a-documentação">Acessando a documentação</a></li>
    <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 

Também será necessário a conexão com um banco de dados PostgreSQL. É necessário criar um arquivo ".env" na raiz do projeto e preencher as variáveis de acordo com o arquivo ".env.example" que está na raiz do projeto também. Caso você tenha o docker instalado em sua máquina pode executar o seguinte comando na raiz do projeto para subir um container com a base de dados já criada.

```bash
$ docker-compose up -d
```
Ou pode criar uma base de dados manualmente em um banco de dados PostgreSQL. De qualquer forma é necessário informar os dados de conexão no arquivo ".env".
### Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/alisson-moura/valoriza-api

# Acesse a pasta do projeto no terminal/cmd
$ cd valoriza-api

# Instale as dependências
$ npm install
```

Após clonar, instalar as dependências  e criar o arquivo ".env" na raiz do projeto é necessário rodar as migrations para criar as tabelas no banco de dados, então após subir o banco de dados PostgreSQL com a base de dados criada basta executar o seguinte comando:


```bash
$ npm run typeorm migration:run
```

E para iniciar a aplicação em modo de desenvolvimento:
```bash
$ npm run start:dev
```

A API ficara disponível no endereço "http://localhost:3000".

### Testes unitários :construction: Não implementado ainda
A api tem uma cobertura de testes unitários, para rodar os testes basta executar:
```bash
npm run test
```

### Acessando a documentação
A documentação da aplicação foi feita usando Swagger e contém os dados necessários para usar corretamente os endpoints, para visualizar a documentação basta acessar no seu navegador: http://localhost:3000/.
Também é possível realizar testes através 

### Tecnologias utilizadas
As seguintes ferramentas foram usadas na construção do projeto:
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeOrm](https://typeorm.io/#/)
- [Swagger](https://swagger.io/specification/)


## Contato

 <img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/48321754?s=460&u=9faab799c661b3f1227c25e0233a2f30b699218a&v=4" width="100px;" alt=""/><br />
<b>Alisson Moura 👋🏽 [Entre em contato!](https://www.linkedin.com/in/alisson-mo-moura/) </b>
 

