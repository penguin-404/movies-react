import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setErrorMessage('');
    setMovieList([]);
    
    try {
      const searchUrl = `${API_BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`;
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'No movies found');
        return;
      }

      const moviePromises = data.Search.map(async (movie) => {
        const detailsUrl = `${API_BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`;
        const res = await fetch(detailsUrl);
        return res.json();
      });

      const moviesWithDetails = await Promise.all(moviePromises);
      setMovieList(moviesWithDetails);

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchMovies(searchTerm);
  },[searchTerm]);

 return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Background Image" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={fetchMovies} />
        </header>

        <section className="all-movies mt-10">
          <h2 className="text-2xl mb-4">Search Results</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
