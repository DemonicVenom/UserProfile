import React, { useState, useEffect } from 'react';
import Registration from './Components/Registration';
import LoginForm from './Components/LoginForm';
import UserProfile from './Components/UserProfile';

function App() {
  const [users, setUsers] = useState([]);              // All registered users
  const [loggedInUser, setLoggedInUser] = useState(null); // Current user
  const [showLogin, setShowLogin] = useState(false);      // Toggle login/signup

  // ✅ Load users and logged-in user from localStorage on app start
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const storedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (storedUsers) {
      setUsers(storedUsers);
    }

    if (storedLoggedInUser) {
      setLoggedInUser(storedLoggedInUser);
    }
  }, []);

  // ✅ Handle user registration
  const handleRegister = (userData) => {
    const emailExists = users.some((user) => user.email === userData.email);

    if (emailExists) {
      alert('This email is already registered!');
      return;
    }

    const updatedUsers = [...users, userData];
    setUsers(updatedUsers);

    // ✅ Save users to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Registration successful! Please log in.');
    setShowLogin(true); // Move to login page
  };

  // ✅ Handle login
  const handleLoginSuccess = (email, password) => {
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      setLoggedInUser(matchedUser);

      // ✅ Save current user to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

      alert('Login Successful!');
    } else {
      alert('Invalid email or password.');
    }
  };

  // ✅ Handle logout
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div className="App">
      {loggedInUser ? (
        <UserProfile user={loggedInUser} onLogout={handleLogout} />
      ) : showLogin ? (
        <>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <p style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <Registration onRegister={handleRegister} />
          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
