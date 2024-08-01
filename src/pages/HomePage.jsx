import React, { useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import axios from 'axios';

const HomePage = () => {
  const { movies, setMovies } = useMovies();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, [setMovies]);

  return (
    <div className="home-page">
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
