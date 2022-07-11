'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  const response = await fetch(url);
  const data = response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error('sorry! ,request failed');
  }
}

function fetchAndPopulatePokemons(data) {
  const select = document.querySelector('select');
  data.forEach((option) => {
    const createOption = document.createElement('option');
    createOption.value = `${option.url}`;
    createOption.textContent = `${option.name}`;
    select.appendChild(createOption);
  });

  select.addEventListener('input', fetchImage);
}

function fetchImage() {
  const imageContainer = document.querySelector('.image-container');
  imageContainer.textContent = '';

  const options = document.querySelector('.select-option').value;
  imageView(options);
}
function renderError(err) {
  const errElement = document.createElement('p');
  errElement.textContent = `${err}`;
  document.body.appendChild(errElement);
}
// DOM Functions

const listView = () => {
  const listDiv = document.createElement('div');
  listDiv.className = 'select-section';
  const select = document.createElement('select');
  select.className = 'select-option';
  const imageDiv = document.createElement('div');
  imageDiv.className = 'image-container';
  listDiv.appendChild(select);
  listDiv.append(imageDiv);
  return listDiv;
};
const listPage = () => {
  const container = document.querySelector('.container');
  const select = listView();
  container.append(select);
};
const buttonView = () => {
  const createButtonDiv = document.createElement('div');
  const createButton = document.createElement('button');
  createButtonDiv.className = 'container';
  createButton.className = 'btn';
  createButton.type = 'button';
  createButton.textContent = 'Get Pokemon';
  createButtonDiv.appendChild(createButton);
  document.body.appendChild(createButtonDiv);
};

const imageView = (src) => {
  const imageDiv = document.querySelector('.image-container');
  const image = document.createElement('img');
  image.alt = `${src} Image`;
  image.src = `${src}`;

  imageDiv.appendChild(image);
};
async function main() {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const fetchApi = await fetchData(url);
    buttonView();
    listPage();
    const btn = document.querySelector('.btn');

    btn.addEventListener('click', () => {
      fetchAndPopulatePokemons(fetchApi.results);
    });
  } catch (err) {
    renderError(err);
  }
}
window.addEventListener('load', main);
