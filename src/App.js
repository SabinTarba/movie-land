import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import axios from 'axios';
import MovieCard from './MovieCard';

const API_KEY = 'c81f55eb'
const API_URL = 'http://www.omdbapi.com?apikey='.concat(API_KEY);

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const respone = await axios.get(`${API_URL}&s=${title}`)
    const data = await respone.data;
    setMovies(data.Search);
  }

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
