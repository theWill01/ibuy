import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rating({rate}) {
  const [rating, setRating] = useState(rate);
  const [hover, setHover] = useState(null);

  const stars = [...Array(5)].map((star, index) => {
    const ratingValue = index + 1;
    return (
      <label key={index}>
     
        <input
          type={"radio"}
          name={"rating"}
          style={{ display: "none" }}
          value={ratingValue}
          onClick={(c) => setRating(ratingValue)}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={"cursor-pointer"} 
          color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
          onMouseEnter={(c) => setHover(ratingValue)}
          onMouseLeave={(c) => setHover(null)}
        />
      </label>
    );
  });

  return <div>{stars}</div>;
}

export default Rating;
