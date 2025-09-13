import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ url, altText }) => {
  return (
    <div className="w-48">
      <img alt={altText} src={`${IMG_CDN_URL}/${url}`} />
    </div>
  );
};

export default MovieCard;
