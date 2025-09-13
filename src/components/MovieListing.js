import MovieCard from './MovieCard';

const MovieListing = ({ title, movies }) => {
  return (
    <div className="px-6 bg-black">
      <h1 className="text-white text-3xl font-bold pb-4">{title}</h1>

      <div className="flex overflow-x-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 mb-8">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} url={movie.poster_path} altText={movie.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
