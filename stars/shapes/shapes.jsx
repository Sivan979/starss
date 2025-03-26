import PropTypes from 'prop-types';

export const MovieShape = {
  id: PropTypes.number,
  title: PropTypes.string,
  adult: PropTypes.bool,
  backdrop_path: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  original_language: PropTypes.string,
  original_title: PropTypes.string,
  overview: PropTypes.string,
  popularity: PropTypes.number,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  video: PropTypes.bool,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
};

export const TrendingMovie = {
  searchTerm: PropTypes.string,
  movie_id: PropTypes.number,
  title: PropTypes.string,
  count: PropTypes.number,
  poster_url: PropTypes.string,
};

export const MovieDetails = {
  adult: PropTypes.bool,
  backdrop_path: PropTypes.string,
  belongs_to_collection: {
    id: PropTypes.number,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
  },
  budget: PropTypes.number,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  homepage: PropTypes.string,
  id: PropTypes.number,
  imdb_id: PropTypes.string,
  original_language: PropTypes.string,
  original_title: PropTypes.string,
  overview: PropTypes.string,
  popularity: PropTypes.number,
  poster_path: PropTypes.string,
  production_companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      logo_path: PropTypes.string,
      name: PropTypes.string,
      origin_country: PropTypes.string,
    })
  ),
  production_countries: PropTypes.arrayOf(
    PropTypes.shape({
      iso_3166_1: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  release_date: PropTypes.string,
  revenue: PropTypes.number,
  runtime: PropTypes.number,
  spoken_languages: PropTypes.arrayOf(
    PropTypes.shape({
      english_name: PropTypes.string,
      iso_639_1: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  status: PropTypes.string,
  tagline: PropTypes.string,
  title: PropTypes.string,
  video: PropTypes.bool,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
};

export const TrendingCardPropsShape = {
  movie: PropTypes.shape(TrendingMovie),
  index: PropTypes.number,
};

