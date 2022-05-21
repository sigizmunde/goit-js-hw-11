import { getSearchResult } from './modules/requests';
import { markupPage } from './modules/markup';

const PER_PAGE = 20;
let pageNum = 1;
const refs = {};

window.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  refs.searchForm = document.querySelector('#search-form');
  refs.galleryContainer = document.querySelector('#gallery');
  refs.searchForm.addEventListener('submit', onSearchSubmit);
}

async function onSearchSubmit(event) {
  event.preventDefault();
  pageNum = 1;
  const searchData = event.currentTarget.elements['searchQuery'].value;
  const data = await getData(searchData);
  console.log(data);
  const pageData = parseData(data);
  markupPage(refs.galleryContainer, pageData);
}

async function getData(searchData) {
  try {
    const request = await getSearchResult(searchData, PER_PAGE, pageNum);
    const data = request.data;
    return data;
  } catch (error) {
    throw error;
  }
}

function parseData(data) {
  const totalPages = Math.ceil(data.total / PER_PAGE);

  let imageObjArr;

  if (data.hits.length > 0) {
    imageObjArr = data.hits.map(item => {
      return {
        previewURL: item.webformatURL,
        imageURL: item.largeImageURL,
        tags: item.tags,
        likes: item.likes,
        views: item.views,
        comments: item.comments,
        downloads: item.downloads,
      };
    });
  }
  return { totalPages, images: imageObjArr };
}
