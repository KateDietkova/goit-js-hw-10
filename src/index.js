import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './components/fetchCountries.js';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const REPORT_MESSAGE =
  'Too many matches found. Please enter a more specific name.';

const refs = {
  searchField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchField.addEventListener(
  'input',
  debounce(onSearchCountry, DEBOUNCE_DELAY)
);

function onSearchCountry(event) {
  let searchCountry = event.target.value.trim();
  if (searchCountry === '') {
    clearCountriesMarkup();
    return;
  }
  fetchCountries(searchCountry)
    .then(countries => {
      const amountOfCountries = countries.length;
      if (amountOfCountries > 10) {
        Notiflix.Notify.info(REPORT_MESSAGE);
        return;
      }
      if (amountOfCountries >= 2 && amountOfCountries <= 10) {
        clearCountriesMarkup();
        appendCountriesListMarkup(countries);
      }

      if (amountOfCountries === 1) {
        clearCountriesMarkup();
        appendCountryInfoMarkup(countries);
      }
    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearCountriesMarkup();
    });
}

function createCountriesListMarkup(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="county-item">
                <img class='flag-img' src=${flags.svg} alt='${name}'> 
                <p>${name}</p>
            </li>`;
    })
    .join('');
}

function createCountryInfoMarkup(country) {
  return country
    .map(({ name, capital, population, flags, languages }) => {
      return `<ul>
            <li class="info-item">
                <img class='flag-info' src=${flags.svg} alt='${name}'>
                <p class="info-text country-name">${name}</p>
            </li>
            <li class="info-item">
                <p class='info-subtitle'>Capital:</p> 
                <p class="info-text">${capital}</p>
            </li>
            <li class="info-item">
                <p class='info-subtitle'>Population:</p> 
                <p class="info-text">${population}</p>
            </li>
            <li class="info-item">
                <p class='info-subtitle'>Languages:</p>
                <p class="info-text">${languages
                  .map(lang => {
                    return lang.name;
                  })
                  .join(', ')}</p>
            </li>
        </ul>`;
    })
    .join('');
}

function appendCountriesListMarkup(countries) {
  const countryListMarkup = createCountriesListMarkup(countries);
  refs.countryList.insertAdjacentHTML('beforeend', countryListMarkup);
}

function appendCountryInfoMarkup(country) {
  const countryInfoMarkup = createCountryInfoMarkup(country);
  refs.countryInfo.insertAdjacentHTML('beforeend', countryInfoMarkup);
}

function clearCountriesMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
