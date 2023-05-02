export function fetchCountries(name) {
  const url =
    'https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages';
  return fetch(url)
    .then(response => {
      if (response.status === 404) {
        throw new Error('Country not found');
      }
      return response.json();
    })
    .then(data => {
      if (data.length >= 10) {
        throw new Error('Too many countries found');
      }
      return data;
    });
}
