# To Do API
---
## ✨💡 Functionalities 💡✨

---

<br>

This is a project about a challenge on [Rocketseat](https://www.rocketseat.com.br/). <br>

This challenge is about to create CRUD API to tasks.

<br><br>

## 🚗 REST API 🚗

---

<br>

### Task info
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed_at": "Date",
    "created_at": "Date",
    "updated_at": "Date",
  }
  ```

`GET /tasks`

    http://localhost:3333/tasks

`POST /tasks`

    http://localhost:3333/tasks
  ```json
  // request
  {
    "title": "string",
    "description": "string"
  }
  ```

`PUT /tasks/:id`

    http://localhost:3333/tasks/91d2732d-a370-4a15-bf79-0d98b237a84
  ```json
  // request (title only or description only or both)
  {
    "title": "string",
    "description": "string"
  }
  ```

`DELETE /tasks/:id`

    http://localhost:3333/tasks/91d2732d-a370-4a15-bf79-0d98b237a84

`PATCH /tasks/:id/complete`

    http://localhost:3333/tasks/91d2732d-a370-4a15-bf79-0d98b237a84/complete



<br><br>

## 🛠️ Tecnology 🛠️

---

<br>

- [Nodejs](https://nodejs.org/en)
- [CSV for Nodejs](https://csv.js.org/)

<br><br>

## 🎲 Getting started 🎲

---

<br>

```bash
npm install

# server
npm run dev

# exemple to send csv
npm run send:stream-csv
```

<br><br><br>

---

<p align="center">Developed with 💜 by Gabriele Nakassima </p>