import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash/debounce';
import { fetchCountries } from './fetchcountries';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const aboutCountry = document.querySelector('.country-info');

const debounceFunction = debounce(fetchCountriesWithDebounce, DEBOUNCE_DELAY);
let input = document.getElementById('search-box');
input.addEventListener('input', debounceFunction);

function fetchCountriesWithDebounce(event) {
    const name = event.target.value.trim();
    if (name.length === 0) {
        countryList.innerHTML = '';
        aboutCountry.innerHTML = '';
    }
    if (name.length >= 1) {
        fetchCountries(name).then(data => {
            console.log(data);
            countryList.innerHTML = '';
            aboutCountry.innerHTML = '';
            if (data && data.length >= 10) {
                Notiflix.Notify.warning('Too many countries found');
            } else if (data.length > 1) {
                for (let i = 0; i < data.length; i++) {
                    countryList.insertAdjacentHTML(
                        'beforeend',
                        `<li><img src="${data[i].flags.svg}" class="image">${data[i].name.common}</li>`
                    );
                }
            } else if (data.length === 1) {
                const languageBlock = Object.values(data[0].languages).join(', ');
                aboutCountry.insertAdjacentHTML(
                    'afterbegin',
                    `<h1 class="title"><img src="${data[0].flags.svg}" class="image">${data[0].name.official}</h1><ul class="aboutcountrylist"><li>Capital: ${data[0].capital}</li><li>Population: ${data[0].population}</li><li>Flag: <img src="${data[0].flags.svg}" class="image"></li><li>Language: ${languageBlock}</li></ul>`
                );
            } else {
                Notiflix.Notify.failure('Country not found');
            }
        }).catch(error => {
            console.error('Error fetching country data:', error);
        });
    }
}
