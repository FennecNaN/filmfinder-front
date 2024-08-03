import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css';
import { useAuth } from '../context/AuthContext';
import AlertMessage from './AlertMessage';
import MovieItem from './MovieItem';
import config from '../config'; 


const MovieList = ({ movies }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`${config.apiUrl}/favorites/${user.id}`);
          setFavoriteIds(response.data.map(movie => movie.id));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };

      fetchFavorites();
    }
  }, [user]);

  const addFavorite = async (movieId) => {
    if (!user) {
      setAlertMessage('You need to be logged in to add favorites');
      return;
    }

    try {
      await axios.post(`${config.apiUrl}/favorites`, { userId: user.id, movieId });
      setFavoriteIds([...favoriteIds, movieId]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (movieId) => {
    if (!user) {
      setAlertMessage('You need to be logged in to remove favorites');
      return;
    }

    try {
      await axios.delete(`${config.apiUrl}/favorites`, {
        data: { userId: user.id, movieId }
      });
      setFavoriteIds(favoriteIds.filter(id => id !== movieId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="movie-list">
      <h1>Movies</h1>
      <div className="movie-list-container">
        {movies.map((movie) => (
          <MovieItem 
            key={movie.id}
            movie={movie}
            isFavorite={favoriteIds.includes(movie.id)}
            onToggleFavorite={(movieId) => favoriteIds.includes(movieId) ? removeFavorite(movieId) : addFavorite(movieId)}
          />
        ))}
      </div>
      {alertMessage && (
        <AlertMessage 
          message={alertMessage} 
          onClose={() => setAlertMessage('')} 
        />
      )}
    </div>
  );
};

export default MovieList;
