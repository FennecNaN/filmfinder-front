import React, { useState } from 'react';
import axios from 'axios';
import './MovieItem.css';

const MovieItem = ({ movie, isFavorite, onToggleFavorite }) => {
  const [platforms, setPlatforms] = useState([]);
  const [showPlatforms, setShowPlatforms] = useState(false);

  const handleMovieClick = async () => {
    if (!showPlatforms) {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${movie.id}/platforms`);
        setPlatforms(response.data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    }
    setShowPlatforms(!showPlatforms);
  };

  return (
    <div className="movie-item" onClick={handleMovieClick}>
      <h3>{movie.title}</h3>
      <p>Release Year: {movie.release_year}</p>
      <button onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(movie.id);
      }}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      {showPlatforms && (
        <div className="platforms-list">
          <h4>Available on:</h4>
          {platforms.map((platform, index) => (
            <div key={index} className="platform-item">
              <p>{platform.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieItem;
