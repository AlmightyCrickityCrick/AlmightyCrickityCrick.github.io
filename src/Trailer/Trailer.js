import React from "react";

function Trailer(props) {
  return (
    <div>
      <div className="trailer-container">
        <div className="trailer-text">Trailer</div>
        <div className="trailer">
          <iframe
            width="1280"
            height="720"
            src={`https://www.youtube.com/embed/${props.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}

export default Trailer;
