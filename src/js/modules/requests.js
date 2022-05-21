import axios from 'axios';

const MY_API_KEY = '27547013-b29238c577303ab781139b8a0';
const URL = 'https://pixabay.com/api/';

export async function getSearchResult(searchString = '', per_page, page) {
  const options = {
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };
  const searchURI = `${URL}?key=${MY_API_KEY}&q=${searchString}&per_page=${per_page}&page=${page}`;
  return await axios.get(searchURI, options);
}
