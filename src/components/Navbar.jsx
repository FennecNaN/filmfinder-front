import './NavBar.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { useMovies } from '../context/MovieContext';
import axios from 'axios';

function Navbar() {
  const { user, logout } = useAuth();
  const { setMovies } = useMovies();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <SearchBar onSearch={handleSearch} />
        </li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li>Welcome, {user.name}</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
