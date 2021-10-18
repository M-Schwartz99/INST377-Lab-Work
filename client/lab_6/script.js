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

  function displayMatches(event) {
    const filtered_data = findMatches(event.target.value, data_array);
    const html = filtered_data
      .map((place) => `
          <li> 
          <p>${place.name}</p>
          <p>${place.category}</p>
          <p>${place.address_line_1}</p>
          <p>${place.zip}</p>
          </li>
          `)
      .join('');

    display_list.innerHTML = html;
  }

  const word_to_search = document.querySelector('#search');
  const display_list = document.querySelector('#result-list');

  word_to_search.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}

window.onload = windowActions;
