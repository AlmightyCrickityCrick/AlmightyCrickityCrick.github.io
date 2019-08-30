import React from "react";
import Card from "../Card/Card";
import { API_Key } from "../ConstantsJS";
import "./Search.css";
class Search extends React.Component {
  state = {
    query: "",
    results: [],
  };
  handleChange(event) {
    this.setState({ query: event.target.value });
  }
  handleClick() {
    {
      this.state.query &&
        Promise.all([
          fetch(
            "https://api.themoviedb.org/3/search/movie?" +
              API_Key +
              "language=en-US&query=" +
              this.state.query +
              "&page=1&include_adult=false"
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
            results: newMovie,
          });
        });
    }
  }
  render() {
    return (
      <div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            value={this.state.query}
            onChange={this.handleChange.bind(this)}
          />

          <button
            className="search-button"
            onClick={this.handleClick.bind(this)}>
            Search
          </button>
        </div>
        <div className="collection-new-card">
          {this.state.results.length > 0 &&
            this.state.results.map(result => (
              <Card
                title={result.title}
                description={result.description}
                genres={result.genres_name}
                src={result.src}
                link={"/movie/" + result.id}></Card>
            ))}
        </div>
      </div>
    );
  }
}

export default Search;
