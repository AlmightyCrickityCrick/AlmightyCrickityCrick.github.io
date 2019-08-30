import React from "react";
import { Link } from "react-router-dom";

import Card from "../Card/Card";
import "./Collection.css";
import { API_Key } from "../ConstantsJS.js";

class Collection extends React.Component {
  state = {
    movies: [],
  };
  fetchMovies() {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
          API_Key +
          "&language=en-US" +
          "&sort_by=" +
          this.props.sortType +
          "&include_adult=false&include_video=false&page=" +
          this.props.page
      ).then(response => response.json()),
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
          API_Key +
          "&language=en-US"
      ).then(response => response.json()),
    ]).then(response => {
      const movieList = response[0].results;
      const genreList = response[1].genres;
      const newMovie = movieList.map(movies => ({
        title: movies.original_title,
        description: movies.overview,
        src:
          movies.poster_path &&
          "https://image.tmdb.org/t/p/w500" + movies.poster_path,
        genres_id: movies.genre_ids,
        genres_name: movies.genre_ids.map(
          genreID => genreList.find(id => id.id === genreID).name
        ),
        id: movies.id,
      }));
      this.setState({
        movies: newMovie,
      });
    });
  }
  componentDidMount() {
    this.fetchMovies();
  }
  componentDidUpdate(prevProps) {
    prevProps.page !== this.props.page && this.fetchMovies();
  }
  render() {
    return (
      <div className="collection">
        <div className="collection-direction">
          <h1 className="collection-title">{this.props.collectionName}</h1>
          <Link to={this.props.itemLink} className="collection-button">
            See More
          </Link>
        </div>
        <div className="collection-new-card">
          {this.state.movies.slice(0, this.props.cardCount).map(movie => {
            return (
              movie.src && (
                <Card
                  title={movie.title}
                  description={movie.description}
                  genres={movie.genres_name}
                  src={movie.src}
                  link={"/movie/" + movie.id}></Card>
              )
            );
          })}
        </div>
      </div>
    );
  }
}

export default Collection;
