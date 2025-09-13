import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import HeroSection from './HeroSection';
import HomeBody from './HomeBody';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      <HeroSection />
      <HomeBody />
    </div>
  );
};

export default Browse;
