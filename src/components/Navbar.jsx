import './NavBar.css';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { useMovies } from '../context/MovieContext';
import axios from 'axios';

function Navbar() {
  const { user, logout } = useAuth();
  const { setMovies } = useMovies();
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

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

  const handleHomeClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
      if (searchBarRef.current) {
        searchBarRef.current.clearSearch();
      }
      navigate('/');
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </li>
        <li>
          <SearchBar ref={searchBarRef} onSearch={handleSearch} />
        </li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li>Welcome, {user.name}</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
