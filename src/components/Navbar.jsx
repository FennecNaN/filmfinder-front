import './NavBar.css';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import { useMovies } from '../context/MovieContext';
import axios from 'axios';
import config from '../config'; 

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
      console.log(config.apiUrl);
      const response = await axios.get(`${config.apiUrl}/movies/search?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleHomeClick = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/movies`);
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
      <div className="nav-left">
        <span className="nav-link" onClick={handleHomeClick}>Home</span>
        <SearchBar ref={searchBarRef} onSearch={handleSearch} />
      </div>
      <div className="nav-right">
        <ul>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li>Welcome, {user.name}</li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
