import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import HeroSection from './HeroSection';

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <HeroSection />
    </div>
  );
};

export default Browse;
