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
  if (response.ok) {
    return response.json();
  }
  throw new Error('sorry! ,request failed');
}

function fetchAndPopulatePokemons(data) {
  const optionEl = document.querySelector('select');
  data.forEach((option) => {
    const createOption = document.createElement('option');
    createOption.value = `${option.url}`;
    createOption.textContent = `${option.name}`;
    optionEl.appendChild(createOption);
  });

  optionEl.addEventListener('input', () => {
    fetchImage();
  });
}

async function fetchImage() {
  const imageContainer = document.querySelector('.image-container');
  imageContainer.textContent = '';

  const imageUrl = document.querySelector('select').value;

  try {
    const data = await fetchData(imageUrl);
    const imagSrc = data.sprites.front_default;
    imageView(imagSrc);
  } catch (error) {
    renderError(error);
  }
}

function renderError(err) {
  const errElement = document.createElement('p');
  errElement.textContent = `${err}`;
  document.body.appendChild(errElement);
}

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
  image.src = src;
  imageDiv.appendChild(image);
};

async function main() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  try {
    const data = await fetchData(url);
    buttonView();

    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
      if (!document.querySelector('.select-section')) {
        listPage();
        fetchAndPopulatePokemons(data.results);
      }
    });
  } catch (err) {
    renderError(err);
  }
}
window.addEventListener('load', main);
