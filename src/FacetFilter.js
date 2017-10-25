import React, { Component } from 'react';

const FacetFilter = ({ header, filters, onSelect }) =>
  <div className="filter">
    <div className="filter-header">{header}</div>
    <div className="filter-body">
      {
        filters && filters.map((filter, index) =>
          <div key={index} className={'filter-value' + (filter.active ? ' active' : '')} onClick={() => onSelect(filter.label)}>
            <div className="label">{filter.label}</div>
            <div className="value">{filter.count}</div>
          </div>
        )
      }
    </div>
  </div>

export default class FacetFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { facetValues: [] }
  }

  componentDidMount() {
    this.props.algoliasearchHelper.on('result', (algoliaResult) => {
      this.setState({ facetValues: algoliaResult.getFacetValues(this.props.facet, { sortBy: ['name:asc'] }) });
    });
  }

  render() {
    return (
      <FacetFilter
        header={this.props.header}
        filters={this.state.facetValues.map(facet => {
          return { label: facet.name, count: facet.count, active: facet.isRefined };
        })}
        onSelect={(facetName) => {
          this.props.algoliasearchHelper.toggleFacetRefinement(this.props.facet, facetName).search()
        }}
      />
    );
  }
}