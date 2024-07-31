import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
