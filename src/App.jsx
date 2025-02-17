import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import FavoritePage from './pages/FavoritePage';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/profile" element={<UserProfile />} /> 
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
