import React, { useEffect, useState } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import axios from 'axios';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const { movies, setMovies } = useMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies?page=${currentPage}&limit=6`);
        setMovies(response.data);

        const totalResponse = await axios.get('http://localhost:5000/api/movies/count');
        setTotalPages(Math.ceil(totalResponse.data.count / 6));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, [currentPage, setMovies]);

  return (
    <div className="home-page">
      <MovieList movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HomePage;
