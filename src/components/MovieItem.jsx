import React from 'react';

const MovieItem = ({ movie }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Release Year: {movie.release_year}</p>
    </div>
  );
};

export default MovieItem;
