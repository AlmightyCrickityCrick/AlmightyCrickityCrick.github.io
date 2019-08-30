import React from "react";
import "./Cast.css";

function Cast(props) {
  return (
    <div className="individual-actor">
      <div className="actor-portrait">
        <img className="portrait" src={props.image} alt="no image" />
      </div>
      <div className="actor-info">
        <p className="character-name">{props.role}</p>
        <p className="actor-name">{props.name}</p>
      </div>
    </div>
  );
}

export default Cast;
