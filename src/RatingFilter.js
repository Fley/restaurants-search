import React, { Component } from 'react';
import RatingStars from './RatingStars';

const RatingFilter = ({ header, filters, onSelect }) =>
  <div className="filter">
    <div className="filter-header">{header}</div>
    <div className="filter-body">
      {filters && filters.map((filter, index) =>
        <div key={index} className="filter-value" onClick={() => onSelect(filter.label, filter.active)}>
          <div className="label"><RatingStars rating={Number(filter.label)} /></div>
          <div className="value">{filter.active ? '✔' : ''}</div>
        </div>
      )}
    </div>
  </div>

export default class RatingFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeValue: undefined }
  }

  render() {
    return (
      <RatingFilter
        header="Rating"
        filters={this.props.filters.map(filter => {
          return { label: filter, active: filter === this.state.activeValue }
        })}
        onSelect={(rating, active) => {
          this.props.algoliasearchHelper.removeNumericRefinement('stars_count')
          if (!active) {
            this.props.algoliasearchHelper.addNumericRefinement('stars_count', '>=', rating)
              .addNumericRefinement('stars_count', '<', rating + 1);
            this.setState({ activeValue: rating });
          } else {
            this.setState({ activeValue: undefined });
          }
            this.props.algoliasearchHelper.search();
        }}
      />
    );
  }
}