import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_KEY = 'c81f55eb'
const API_URL = 'https://www.omdbapi.com?apikey='.concat(API_KEY);

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const searchMovies = async (title) => {
    await fetch(`${API_URL}&s=${title}`,
      {
        credentials: 'same-origin',
        mode: 'cors'
      })
      .then((response) => response.json())
      .then((data) => setMovies(data.Search));

  };

  useEffect((searchTerm) => {
    searchMovies(searchTerm)
  }, [])

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }} />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>



      {
        movies?.length > 0 ?
          (
            <div className="container">
              {
                movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))
              }
            </div>

          ) : (
            <div className="empty">
              <h2>No movies found!</h2>
            </div>
          )

      }

    </div>

  )
}

export default App;
