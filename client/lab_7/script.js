/* eslint-disable array-callback-return */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
async function windowActions() {
  const data_link = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const endpoint = await fetch(data_link);
  // .then((blob) => blob.json())
  // .then((data) => data_array.push(...data));

  const data_array = await endpoint.json();

  function findMatches(word, array) {
    return array.filter((place) => {
      // match the search word
      const regex = new RegExp(word, 'gi');
      return place.name.match(regex) || place.category.match(regex);
    });
  }

  function plotMarker(mark) {
    L.marker([mark[1], mark[0]]).addTo(mymap);
  }

  function plotMap(data) {
    const co_ord1 = data[0].geocoded_column_1.coordinates[1];
    const co_ord2 = data[0].geocoded_column_1.coordinates[0];
    mymap.setView([co_ord1, co_ord2], 15);
    data.map((place) => {
      plotMarker(place.geocoded_column_1.coordinates);
    });
  }

  function displayMatches(event) {
    const filtered_data = findMatches(event.target.value, data_array);
    const html = filtered_data
      .map(
        (place) => `
            <li> 
            <p>${place.name}</p>
            <p>${place.address_line_1}</p>
            </li>
            `
      )
      .join('');
    display_list.innerHTML = html;
    if (filtered_data.length < 5) {
      plotMap(filtered_data);
    } else {
      plotMap(filtered_data.slice(0, 5));
    }
  }

  const word_to_search = document.querySelector('#search');
  const display_list = document.querySelector('#result-list');
  word_to_search.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
  var mymap = L.map('mapid');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
    minZoom: 10,
    maxZoom: 10
  }).addTo(mymap);
}
window.onload = windowActions;
