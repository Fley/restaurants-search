import React from 'react';
import RatingStars from './RatingStars';

const Restaurant = ({ name, rating, reviewsCount, foodType, neighborhood, priceRange, pictureUrl, reserveUrl }) =>
  <div className="restaurant" onClick={() => window.open(reserveUrl, '_blank')}>
    <div className="restaurant-picture-container">
      <div className="restaurant-picture" style={{ backgroundImage: `url("${pictureUrl}")` }}></div>
    </div>
    <div className="restaurant-body">
      <div className="restaurant-header" dangerouslySetInnerHTML={{ __html: name }}></div>
      <div className="restaurant-rating">
        <RatingStars rating={rating} /> ({reviewsCount} reviews)
      </div>
      <div className="restaurant-details">
        <span dangerouslySetInnerHTML={{ __html: foodType }}></span> | <span dangerouslySetInnerHTML={{ __html: neighborhood }}></span> | <span>{priceRange}</span>
      </div>
    </div>
  </div>

export default Restaurant;