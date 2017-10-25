const fs = require('fs');
const CSV_DELIMITER = ';';

// Read restaurant info line by line and create a collection of info accessible by objectID
const readRestaurantInfo = new Promise((resolve, reject) => {
  let header;
  const restaurantsInfo = {};
  let firstLine = true;
  const readline = require('readline');
  readline.createInterface({
    input: fs.createReadStream('./resources/dataset/restaurants_info.csv')
  }).on('line', line => {
    if (firstLine) {
      header = line.split(CSV_DELIMITER);
      firstLine = false;
    } else {
      const info = line.split(CSV_DELIMITER).reduce((o, e, index) => {
        o[header[index]] = isFinite(e) ? Number(e) : e;
        return o;
      }, {});
      restaurantsInfo[String(info['objectID'])] = info;
    }
  }).on('close', () => resolve(restaurantsInfo));
});

//For payment options, we should only have: AMEX/American Express, Visa, Discover, and MasterCard
//For our purpose, Diners Club and Carte Blanche are Discover cards
const availableOptions = ['Visa', 'MasterCard', 'AMEX', 'Discover']
const discoverOptions = ['Diners Club', 'Carte Blanche']
const overridePaymantOptions = (opts, opt) =>
  availableOptions.includes(opt) ? opts.concat(opt) : discoverOptions.includes('Discover') ? opts.concat(opt) : opts


// Add info to existing restaurants list and override paymentOptions
const mergeRestaurantsInfo = restaurants => restaurantsInfo =>
  restaurants.map(restaurant => Object.assign({}, restaurant, restaurantsInfo[restaurant['objectID']], {
    payment_options: restaurant.payment_options.reduce(overridePaymantOptions, [])
  }))

// Write restaurants json list to file
const writeRestaurants = outputPath => mergedRestaurants => {
  fs.writeFile(outputPath, JSON.stringify(mergedRestaurants), (err) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log("File has been created");
  });
}

const restaurants = require('./resources/dataset/restaurants_list.json');
readRestaurantInfo
  .then(mergeRestaurantsInfo(restaurants))
  .then(writeRestaurants('./mergedRestaurants.json'));


