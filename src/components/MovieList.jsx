import React, { useState } from 'react';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [moviePlatforms, setMoviePlatforms] = useState({});

  const handleMovieClick = async (movieId) => {
    if (moviePlatforms[movieId]) {
      setSelectedMovieId(selectedMovieId === movieId ? null : movieId);
    } else {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${movieId}/platforms`);
        const data = await response.json();
        setMoviePlatforms((prevPlatforms) => ({
          ...prevPlatforms,
          [movieId]: data,
        }));
        setSelectedMovieId(movieId);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    }
  };

  return (
    <div className="movie-list">
      <h1>Movies</h1>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
          <h3>{movie.title}</h3>
          <p>Release Year: {movie.release_year}</p>
          {selectedMovieId === movie.id && moviePlatforms[movie.id] && (
            <div className="platforms-list">
              <h4>Available on:</h4>
              {moviePlatforms[movie.id].map((platform, index) => (
                <div key={index} className="platform-item">
                  <p>{platform.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
