import React from "react";
import { match } from "minimatch";
import { API_Key } from "../ConstantsJS";
import "./Movie.css";
import Cast from "../Cast/Cast";
import Trailer from "../Trailer/Trailer";

class Movie extends React.Component {
  state = {
    movie: { title: "", desciption: "", src: "", genres: [], popularity: 2 },
    trailer: {},
    cast: [],
    showComponent: false,
    size: { description: 32, title: 48 },
    className: "",
  };
  getClass() {
    console.log("popularity", this.state.movie.popularity);
    return this.state.movie.popularity < 5
      ? "popularity-rating-red"
      : this.state.movie.popularity > 7
      ? "popularity-rating-green"
      : "popularity-rating-orange";
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.id +
          "?api_key=" +
          API_Key +
          "&language=en-US"
      )
        .then(movie => movie.json())
        .then(movie => {
          this.setState({
            movie: {
              title: movie.original_title,
              description: movie.overview,
              src:
                movie.poster_path &&
                "https://image.tmdb.org/t/p/w500" + movie.poster_path,
              genres: movie.genres,
              popularity: movie.vote_average,
            },
          });
        });
    }
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "/videos?api_key=" +
        API_Key +
        "&language=en-US"
    )
      .then(trailer => trailer.json())
      .then(trailer => {
        this.setState({
          trailer: {
            src: trailer.results[0] && trailer.results[0].key,
          },
        });
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "/credits?api_key=" +
        API_Key
    )
      .then(cast => cast.json())
      .then(cast =>
        this.setState({
          cast: cast.cast.map(actor => {
            return {
              role: actor.character,
              name: actor.name,
              photo: actor.profile_path
                ? "https://image.tmdb.org/t/p/w500/" + actor.profile_path
                : "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png",
            };
          }),
        })
      );
  }

  handleClick() {
    this.setState({ showComponent: !this.state.showComponent });
  }
  Maximize() {
    this.state.size.title < 70 &&
      this.setState({
        size: {
          description: this.state.size.description + 2,
          title: this.state.size.title + 2,
        },
      });
  }
  Minimize() {
    this.state.size.title > 12 &&
      this.setState({
        size: {
          description: this.state.size.description - 2,
          title: this.state.size.title - 2,
        },
      });
  }

  render() {
    const popularityClassName = this.getClass();
    return (
      <div>
        <Trailer id={this.state.trailer.src}> </Trailer>
        <div className="individual-card">
          <div className="movie-text">
            <div className="genre-space">
              <ul className="genre-list">
                {this.state.movie.genres.map(genre => (
                  <li className="genre-object" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <h1 className="title" style={{ fontSize: this.state.size.title }}>
              {this.state.movie.title}
            </h1>
            <div
              className="movie-description"
              style={{ fontSize: this.state.size.description }}>
              {this.state.movie.description}
            </div>
            <div className="button-holder">
              <button className="min" onClick={this.Minimize.bind(this)}>
                a
              </button>
              <button className="max" onClick={this.Maximize.bind(this)}>
                A
              </button>
            </div>
          </div>
          <div>
            <div className="popularity-place">
              <div className="popularity-title">Rating</div>
              <div className="popularity-content">
                <div className="black-line"></div>
                <div className="black-line"></div>
                <div className={popularityClassName}>
                  {this.state.movie.popularity}
                </div>
                <div className="black-line"></div>
                <div className="black-line"></div>
              </div>
            </div>
            <div className="card-poster">
              <img
                className="poster"
                src={this.state.movie.src}
                alt="No poster yet"
              />
            </div>
          </div>
        </div>
        <div className="actor-container">
          <button className="actor-title" onClick={this.handleClick.bind(this)}>
            Main Cast
          </button>
          {this.state.showComponent && (
            <div className="actor-section">
              {this.state.cast.map(actor => {
                return (
                  <Cast
                    role={actor.role}
                    name={actor.name}
                    image={actor.photo}></Cast>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Movie;
