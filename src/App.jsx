import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <MovieProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MovieProvider>
    </Router>
  );
}

export default App;
