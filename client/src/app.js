const BucketListView = require('./views/bucketListView');
const Request = require('./services/request.js');

const bucketListView = new BucketListView();
const countriesRequest = new Request('https://restcountries.eu/rest/v2/all');


const app = function () {
  countriesRequest.get(populateDropDown);

}

const populateDropDown = function (countries) {
  const select = document.getElementById('country');

  countries.forEach(function (country) {
    const option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  })
}

document.addEventListener('DOMContentLoaded', app);
