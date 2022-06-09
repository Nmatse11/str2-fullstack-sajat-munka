# nodejs-api-fejlesztes

## Prerequisites

- Node.js - Download and Install [Node.js](http://www.nodejs.org/download/).
- MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

## Generate a .gitignore file

- [toptal](https://www.toptal.com/developers/gitignore)
- [api](https://www.toptal.com/developers/gitignore/api/visualstudiocode,node)

## Test api

### Create

```javascript
fetch("http://localhost:3000/person", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    first_name: "Jack",
    last_name: "London",
    email: "jl@gmail.com",
  }),
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

### Update

```javascript
fetch("http://localhost:3000/person/6", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    first_name: "Jack",
    last_name: "London",
    email: "jack.london@gmail.com",
  }),
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

### Delete

```javascript
fetch("http://localhost:3000/person/6", {
  method: "DELETE",
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

### Create new post

```javascript
fetch("http://localhost:3000/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Hello Post",
    body: "Post Content",
    author: "629b1df7141e6233fc4536ac",
  }),
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

### Autentikáció

## Rossz adat

```javascript
fetch("http://localhost:3000/person", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer gdfdgdfgsdfgsdgfhf",
  },
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

## Login

```javascript
fetch("http://localhost:3000/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "user",
    password: "user_pw",
  }),
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

## AccessToken használata

```javascript
fetch("http://localhost:3000/person", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${temp1}`,
  },
})
  .then((r) => r.json())
  .then((d) => console.log(d));
```

## Refresh végpont rossz token hívással

```javascript
fetch("http://localhost:3000/refresh", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authentication: `Bearer ${at}`,
  },
}).then((r) => r.json());
```

## Docker

### Dockerfile

```dockerfile
FROM node:latest
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
```

### default.json

```json
"host": "mongo:27017/myFirstDatabase?retryWrites=true&w=majority"
```

### .gitignore

```
data
```

### docker-compose.yml

```dockerfile
version: "3"
services:
    app:
        build:
            dockerfile: Dockerfile
            context: .
        volumes:
            - /app/node_modules
            - .:/app
        ports:
            - "3000:3000"
        links:
            - mongo
    mongo:
        container_name: mongo
        image: mongo:latest
        volumes:
            - ./data/db:/data/db
        ports:
            - "27017:27017"
```

### package.json

```json
"scripts": {
    "start": "node src/index.js",
    "test": "jest",
    "docker:build": "docker build -t nodejs-api-fejlesztes:latest .",
    "docker-compose:up": "docker-compose up"
  },
```

### server.js

```nodejs
mongoose
    .connect(`mongodb://${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
```
