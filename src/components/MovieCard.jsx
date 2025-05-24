const MovieCard = ({ movie }) => {
  return (
    <div className="bg-[#1e293b] p-4 rounded-xl shadow-md text-white w-[200px]">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-movie.png'}
        alt={movie.Title}
        className="w-full h-[300px] object-cover rounded-md"
      />
      <h3 className="mt-2 font-semibold text-lg">{movie.Title}</h3>
      <p className="text-sm text-gray-400">Year: {movie.Year}</p>
      <p className="text-yellow-400 text-sm mt-1">IMDb Rating: {movie.imdbRating || 'N/A'}</p>
    </div>
  );
};

export default MovieCard;