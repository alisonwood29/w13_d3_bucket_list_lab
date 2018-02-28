const BucketListView = function () {
  this.countries = [];
}

BucketListView.prototype.addCountry = function (country) {
  this.countries.push(country);
  this.render(country);
}

BucketListView.prototype.clear = function () {
  this.countries = [];
  const ul = document.getElementById('country-list');
  ul.innerText = '';
}

BucketListView.prototype.render = function (country) {
  const ul = document.getElementById('country-list');
  const li = document.createElement('li');
  li.innerText = country;

  ul.appendChild('li');
}

module.exports = BucketListView;
