# 👤 User Profile Management System

A full-stack web application with **user registration**, **login**, and **profile management**, built using **React.js** on the frontend and **Node.js/Express + MongoDB** on the backend.

---

## 🚀 Features

- 🔐 User registration with validation
- 🔑 Secure login system using JWT (optional)
- 👤 User profile form with state management
- 📦 Stores data in MongoDB using Mongoose
- 🎨 Separate CSS for each component
- 📁 Clean and modular folder structure

---

## 📂 Project Structure

UserProfile/
├── Backend/
│ ├── models/
│ │ └── User.js
│ ├── routes.js
│ ├── userRoutes.js
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
├── UserProfile/
│ ├── public/
│ ├── src/
│ │ ├── Components/
│ │ │ ├── LoginForm.jsx / .css
│ │ │ ├── Registration.jsx / .css
│ │ │ ├── UserProfile.jsx / .css
│ │ │ └── State.jsx
│ │ ├── App.jsx / .css
│ │ ├── main.jsx
│ │ ├── index.css
│ ├── package.json
│ └── README.md


---

## 🛠️ Tech Stack

- **Frontend:** React.js, JSX, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **State Handling:** React `useState` / custom logic
- **Tools:** VS Code, npm, Vite (if used)

---

## ⚙️ Setup Instructions

### 📌 Prerequisites

- Node.js and npm
- MongoDB installed and running locally or on Atlas

---

### 📦 Backend Setup

```bash
cd Backend
npm install
node server.js
