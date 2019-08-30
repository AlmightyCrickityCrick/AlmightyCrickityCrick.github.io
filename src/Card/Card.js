import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ title, genres, description, src, link }) {
  console.log(src);
  return (
    <div className="container">
      <div className="card">
        {src ? (
          <img className="card-image" src={src} alt="no image" />
        ) : (
          <img
            className="card-placeholder"
            src="https://www.freelogodesign.org/file/app/client/thumb/1e3b86a8-bdad-45e3-a819-520a89ba5545_200x200.png"
            alt="no image"
          />
        )}
        <div className="card-content">
          <div className="genre-container">
            <ul className="genre-list">
              {genres.map(genre => (
                <li className="genre" key={genre}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <h1 className="card-title">{title}</h1>
          <div className="card-text">{description}</div>
          <div className="button-container">
            <Link to={link} className="read-more-button">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
