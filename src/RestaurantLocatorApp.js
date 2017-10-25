import React, { Component } from 'react';
import Shell from './Shell';
const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      algoliasearchHelper: props.initialColor
    };
  }

  componentDidMount() {
    const client = algoliasearch(this.props.applicationID, this.props.apiKey);
    const helper = algoliasearchHelper(client, this.props.indexName, {
      disjunctiveFacets: ['food_type', 'payment_options'],
      hitsPerPage: 4,
    });
    this.setState({ algoliasearchHelper: helper });
    // Perform empty search
    helper.setQueryParameter('aroundLatLngViaIP', true).search();

    this.activateGeolocation(helper)
  }

  activateGeolocation(helper) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => helper.setQueryParameter('aroundLatLngViaIP', false)
          .setQueryParameter('aroundLatLng', [position.coords.latitude, position.coords.longitude])
          .search(),
        () => helper.setQueryParameter('aroundLatLngViaIP', true).search()
      );
    }
  }

  render() {
    return (
      this.state.algoliasearchHelper ?
        <Shell algoliasearchHelper={this.state.algoliasearchHelper} /> :
        <span>Initializing ...</span>
    );
  }
}

export default App;
