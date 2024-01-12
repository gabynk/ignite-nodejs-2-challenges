# Daily Diet API

## ✨💡 Functionalities 💡✨

<br>

This is a project about a challenge on [Rocketseat](https://www.rocketseat.com.br/). <br>

This challenge is about to controller your meals, using user account.

<br><br>

## 🚗 REST API 🚗

<br>

| HTTP | Endpoints | Action |
| --- | --- | --- |
| POST | /user | to create new user account |
| POST | /auth | to login |
| POST | /meals | create a meal |
| GET | /meals | to list all user meals |
| GET | /meals/id | to list a meal |
| PATCH | /meals/id | to update a meal |
| DELETE | /meals/id | to delete a meal |
| GET | /meals/metrics | to get user metrics |

<br><br>
## 🛠️ Tecnology 🛠️

<br>

- [Nodejs](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Knexjs](https://knexjs.org/)

<br><br>

## 🎲 Getting started 🎲

<br>

```bash
npm install

# server
npm run dev
```

<br><br>

## Regras da aplicação

### User
- [X] Deve ser possível criar um usuário
- [X] Deve ser possível identificar o usuário entre as requisições

### Meal
- [X] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [X] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [X] Deve ser possível apagar uma refeição
- [X] Deve ser possível listar todas as refeições de um usuário
- [X] Deve ser possível visualizar uma única refeição
- [X] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- [X] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

<br><br>

## Desafio extra
- [X] Criação dos testes

<br><br><br>

<p align="center">Developed with 💜 by Gabriele Nakassima </p>