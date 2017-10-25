import React, { Component } from 'react';
import Restaurant from './Restaurant';


const SearchResults = ({ totalResults, searchTime, restaurants, hasMoreResults, onShowMore, loadingMore, displayModalFilters }) =>
  <div className="search">
    <div className="search-header">
      <span><span style={{ fontWeight: 'bold' }}>{totalResults} results found</span> in {searchTime} seconds</span>
    </div>
    <div className="search-body">
      {
        restaurants && restaurants.length > 0 ? restaurants.map(restaurant => <Restaurant
          key={restaurant.objectID}
          name={restaurant.name}
          rating={restaurant.rating}
          reviewsCount={restaurant.reviewsCount}
          foodType={restaurant.foodType}
          neighborhood={restaurant.neighborhood}
          priceRange={restaurant.priceRange}
          pictureUrl={restaurant.pictureUrl}
          reserveUrl={restaurant.reserveUrl}
        />) :
          <div>Sorry we found no result for your selection :(</div>
      }
    </div>
    <div className="search-footer">
      {
        hasMoreResults ?
          <input type="button" disabled={loadingMore} value={loadingMore ? 'Searching more ...' : 'Show more'} onClick={onShowMore} /> :
          totalResults ? <span>No more results :)</span> : <span></span>
      }
    </div>
  </div>

// container for connecting with Algolia Helper
export default class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalResults: undefined,
      searchTime: undefined,
      page: undefined,
      nbPages: undefined,
      restaurants: [],
      loading: true,
      loadingMore: false
    }
  }

  componentDidMount() {
    this.props.algoliasearchHelper.on('search', (search) => {
      if (search.page > this.state.page) {
        this.setState({ ...this.state, loadingMore: true });
      }
    })
    this.props.algoliasearchHelper.on('result', (algoliaResult) => {
      this.setState({
        loading: false,
        loadingMore: false,
        totalResults: algoliaResult.nbHits,
        searchTime: algoliaResult.processingTimeMS / 1000,
        page: algoliaResult.page,
        nbPages: algoliaResult.nbPages,
        restaurants: [
          // Concatenate results ONLY when page increments
          ...(algoliaResult.page > this.state.page ? this.state.restaurants : []),
          ...algoliaResult.hits.map(hit => {
            return {
              objectID: hit.objectID,
              name: hit._highlightResult.name.value,
              rating: hit.stars_count,
              reviewsCount: hit.reviews_count,
              foodType: hit._highlightResult.food_type.value,
              neighborhood: hit._highlightResult.neighborhood.value,
              priceRange: hit.price_range,
              pictureUrl: hit.image_url,
              reserveUrl: /.+Mobi.+/.test(navigator.userAgent) && hit.mobile_reserve_url ? hit.mobile_reserve_url : hit.reserve_url
            }
          })
        ]
      });
    });
  }

  render() {
    return (
      !this.state.loading ? <SearchResults
        totalResults={this.state.totalResults}
        searchTime={this.state.searchTime}
        restaurants={this.state.restaurants}
        hasMoreResults={this.state.page + 1 < this.state.nbPages}
        onShowMore={() => {
          this.props.algoliasearchHelper.nextPage().search();
        }}
        loadingMore={this.state.loadingMore}
      /> : <span>Searching...</span>
    );
  }
}