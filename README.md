# Student Management System

## TECH STACK
- FRONTEND: React.js, tailwindcss
- BACKEND: Node.js, express.js
- DATABASE: Sequelize, Postgresql

## APIs
- **POST** /auth/signup - Register/Signup a new user (type: multipart/form-data)

```json
{
    "name": "John Doe",
    "email": "jhon@gmail.com",
    "password": 123456,
    "profilePhoto": "pfp.jpg"
    "branch": "CSE",
    "semester": 5
}
```

- **POST** /auth/login - Login a user (type: application/json)

```json
{
    "email": "jhon@gmail.com",
    "password": 123456,
}
```

- **GET** /user/users - fetch all users
- **GET** /user/delete/:id - delete a user by id

- **PUT** /user/update/:id - update a user by id

```json
{
    "updatedData": {
        "name": "John Doe",
        "email": "jhon@gmail.com",
        "branch": "EE",
        "semester": 5
    }
}
```
