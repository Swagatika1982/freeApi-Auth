# Frontend Authentication App

A simple authentication-based frontend project built using HTML, Tailwind CSS, and Vanilla JavaScript with the FreeAPI Authentication Module.

---

# Features

- User Registration
- User Login
- User Logout
- Current Logged-in User Details
- Session-based Authentication
- Loading States
- Success & Error Messages
- Responsive UI
- Tailwind CSS Styling

---

# Tech Stack

- HTML5
- Tailwind CSS
- Vanilla JavaScript
- Vite
- FreeAPI Authentication API

---

# API Endpoints Used

### Register User

```txt
POST /users/register
```

### Login User

```txt
POST /users/login
```

### Logout User

```txt
POST /users/logout
```

### Get Current User

```txt
GET /users/current-user
```

---

# Project Setup

## Clone Repository

```bash
git clone https://github.com/Swagatika1982/freeApi-Auth.git
```

## Move Into Project Folder

```bash
cd freeapi-auth-app
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# Project Structure

```txt
freeapi-auth-app/
│
├── public/
├── src/
│   ├── main.js
│   └── style.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# Authentication Flow

1. User registers with email, username, password, and role.
2. User logs in using username and password.
3. Session cookie is created after login.
4. Current user details are fetched using authenticated session.
5. User can logout to clear session.

---

# Learning Outcomes

- Understanding frontend authentication flow
- Working with REST APIs
- Handling sessions and cookies
- Managing logged-in user state
- Working with asynchronous API requests
- Using Tailwind CSS with Vite



---

