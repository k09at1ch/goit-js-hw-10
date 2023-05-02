import './css/styles.css';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
import debounce from 'lodash/debounce';

const countryList = document.querySelector('.country-list');
const aboutCountry = document.querySelector('.country-info');

const debounceFunction = debounce(fetchCountriesWithDebounce, DEBOUNCE_DELAY);
let input = document.getElementById('search-box');
input.addEventListener('input', debounceFunction);

function fetchCountriesWithDebounce(event) {
    const name = event.target.value.trim(); // Виконуємо обрізку пробілів з введеного значення
    if (name.length === 0) {
        countryList.innerHTML = ''; // Очистка списку країн
        aboutCountry.innerHTML = ''; // Очистка блоку з інформацією про країну
    }
    if (name.length >= 1) {
        fetchCountries(name);
    }
}



function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    fetch(url)
        .then(response => {

            if (response.status === 404) {
                Notiflix.Notify.failure('Country not found');
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            countryList.innerHTML = ''; // Очистка списку країн
            aboutCountry.innerHTML = ''; // Очистка блоку з інформацією про країну
            if (data.length >= 10) {
                Notiflix.Notify.warning('Too many countries found');
            }
            if (data.length <= 10) {
                if (data.length < 11 || data.length > 1) {
                    for (let i = 0; i < data.length; i++) {
                        countryList.insertAdjacentHTML(
                            'beforeend', // Для додавання країн в список ми використовуємо 'beforeend'
                            `<li><img src="${data[i].flags.svg}" class="image">${data[i].name.common}</li>`
                        );
                    }
                }
                if (data.length === 1) {
                    const languageBlock = Object.values(data[0].languages).join(', '); // Формуємо список мов за допомогою метода join
                    countryList.innerHTML = '';
                    aboutCountry.insertAdjacentHTML(
                        'afterbegin', // Для додавання інформації про країну в блок ми використовуємо 'afterbegin'
                        `<h1 class="title"><img src="${data[0].flags.svg}" class="image">${data[0].name.official}</h1><ul class="aboutcountrylist"><li>Capital: ${data[0].capital}</li><li>Population: ${data[0].population}</li><li>Flag: <img src="${data[0].flags.svg}" class="image"></li><li>Language: ${languageBlock}</li></ul>`
                    );
                }

            }
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}