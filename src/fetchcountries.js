export function fetchCountries(name) {
  const url =
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(response => {
      if (response.status === 404) {
        Notiflix.Notify.warning('Country not found');
        return Promise.reject('Country not found');
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}

