import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantLocatorApp from './RestaurantLocatorApp';
import registerServiceWorker from './registerServiceWorker';

const applicationID = 'EVX93R3AH6';
const apiKey = '9ed568e816a006a56a1a25fff7a17ad5';
const indexName = 'assignment_restaurants';

ReactDOM.render(
  <RestaurantLocatorApp applicationID={applicationID} apiKey={apiKey} indexName={indexName} />,
  document.getElementById('root')
);
registerServiceWorker();
