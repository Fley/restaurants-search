import React from 'react';

const RatingStars = ratingScale => ({ rating }) =>
  <div className="rating">
    <div className="rating-value" style={{ width: `${(100 * rating / ratingScale)}%` }}></div>
  </div>


export default RatingStars(5);