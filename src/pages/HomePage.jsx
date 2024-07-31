import React, { useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import axios from 'axios';

const HomePage = () => {
  const { movies, setMovies } = useMovies();

  useEffect(() => {
    getMovies('');
  }, []);

  const getMovies = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = (query) => {
    getMovies(query);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
