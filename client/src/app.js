const BucketListView = require('./views/bucketListView');
const Request = require('./services/request.js');

const bucketListView = new BucketListView();
const countriesRequest = new Request('https://restcountries.eu/rest/v2/all');
const bucketlistRequest = new Request('http://localhost:3000/countries');


const app = function () {
  countriesRequest.get(populateDropDown);
  bucketlistRequest.get(getBucketListRequestComplete);

  const addCountryButton = document.getElementById('add-country');
  addCountryButton.addEventListener('click', onAddButtonClick);

}



const populateDropDown = function (countries) {
  const select = document.getElementById('country');

  countries.forEach(function (country) {
    const option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  })
}

const getBucketListRequestComplete = function (countries) {
  // console.log('request sent');
  countries.forEach(function (country) {
    bucketListView.addCountry(country);
  })
}

const onAddButtonClick = function (event) {
  event.preventDefault();
  // console.log(event);
  // console.log('button clicked');
  const countryInput = document.getElementById('country').value;
  // console.log(countryInput);
  const countryToSend = {
    name: countryInput
  };

  bucketlistRequest.post(addRequestComplete, countryToSend);
}

const addRequestComplete = function (country) {
  bucketListView.addCountry(country);
}

document.addEventListener('DOMContentLoaded', app);
