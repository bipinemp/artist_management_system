# An Artist Management System 

## Project Setup and Docker Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/bipinemp/artist_management_system.git
```

### 2. Make a postgres Database named artistmngt in your computer.

### 3. Run Docker compose command in terminal

```bash
docker compose up --build
```

### 4. Wait For few seconds
 - For running Frontend
 - For running database migrations
 - For running database seeding
 - For running server

### 5. Final
 - After seeing the sever is running on port 8000 message both frontend and backend are running properly.


### 6. Run Frontend and backend on browser

```bash
frontend - http://localhost:5173
backend - http://localhost:8000
```

### 5. Register a new user in /register and login with that user credentials to view dashboard

## Features

- CRUD operations on Users, Artist and their Musics.
- Secure authentication using jwt access_token and refresh_token concept


## Technologies Used
- **React.js**: For building interactive UI.
- **TypeScript**: For TypeSafe Javascript.
- **TailwindCSS**: For styling.
- **React-Hook-Form**: For proper form management.
- **React-Query**: For proper server side state management.
- **zod**: For proper form validation.
- **shadcn-ui**: For pre-build UI components.
- **pg**: For connecting to database and performing sql queries.
- **express.js**: For backend server.
