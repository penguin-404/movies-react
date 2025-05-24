import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const App = () => {
  const [searchTerm,setSearchTerm] = useState('');

  const [errorMessage,setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}?t=${searchTerm}&apikey=${API_KEY}`;

      // console.log("API_KEY from env:", API_KEY);
      // console.log("API_BASE_URL from env:", API_BASE_URL);


      const response = await fetch(endpoint);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      
      
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchMovies();
  },[]);

  return (
            <main>
              <div className="pattern" />
              
              
              <div className="wrapper">
                <header>
                  <img src="./hero.png" alt="Hero Background Image" />
                  <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy Without the Hassle</h1>
                
                <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />

                </header>

                <section className='all-movies'>
                  <h2 className='mt-[40px]'>All Movies</h2>

                  {isLoading ? (
                    <Spinner />
                  ): errorMessage ? (
                    <p className='text-red-500'>{errorMessage}</p>
                  ): (
                    <ul>
                      {movieList.map((movie) => (
                        <p key = {movie.id} className='text-white'>{movie.Title}</p>
                      ))}
                    </ul>
                  )}
                </section>

              </div>
              
            </main>
  )
}

export default App
