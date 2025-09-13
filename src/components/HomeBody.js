import { useSelector } from 'react-redux';
import MovieListing from './MovieListing';

const HomeBody = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);
  return (
    movies.nowPlayingMovies && (
      <div>
        <MovieListing title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieListing title={'Popular'} movies={movies.popularMovies} />
        <MovieListing title={'Top Rated'} movies={movies.topRatedMovies}/>
        <MovieListing title={'Upcoming'} movies={movies.upcomingMovies}/>
      </div>
    )
  );
};

export default HomeBody;
