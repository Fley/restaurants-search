import React from 'react';

import SearchBar from './SearchBar';
import SearchResultContainer from './SearchResults';

import FacetFilterContainer from './FacetFilter';
import RatingFilterContainer from './RatingFilter';

export default ({ algoliasearchHelper }) =>
  <div className="container">
    <div className="container-header">
      <SearchBar
        placeholder="Search for Restaurants by Name, Cuisine, Location"
        onSearch={(query) => { algoliasearchHelper.setQuery(query).search(); }}
      />
    </div>
    <div className="container-main">
      <div className="sidebar">
        <div className="sidebar-inner">
          <FacetFilterContainer header="Cuisine/Food type" facet="food_type" algoliasearchHelper={algoliasearchHelper} />
          <RatingFilterContainer header="Rating" filters={[0, 1, 2, 3, 4, 5]} algoliasearchHelper={algoliasearchHelper} />
          <FacetFilterContainer header="Payment options" facet="payment_options" algoliasearchHelper={algoliasearchHelper} />
          <input type="button" value="Clear filters" onClick={() => algoliasearchHelper.clearRefinements().search()} />
        </div>
      </div>
      <SearchResultContainer algoliasearchHelper={algoliasearchHelper} />
    </div>
  </div>