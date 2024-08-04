import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieItem from '../components/MovieItem';
import AlertMessage from '../components/AlertMessage';
import '../components/MovieList.css';
import config from '../config'; 

const FavoritePage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/${user.id}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user.id]);

  const removeFavorite = async (movieId) => {
    try {
      await axios.delete(`${config.apiUrl}/favorites`, {
        data: { userId: user.id, movieId }
      });
      setFavorites(favorites.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="movie-list">
      <h1>My Favorites</h1>
      <div className="movie-list-container">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieItem 
              key={movie.id} 
              movie={movie} 
              isFavorite={true} 
              onToggleFavorite={removeFavorite} 
            />
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
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

export default FavoritePage;
