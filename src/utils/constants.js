export const LOGO =
  'https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460';

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.PARCEL_API_KEY}`,
  },
};

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w780';
