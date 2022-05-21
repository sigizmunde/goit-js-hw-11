import { getSearchResult } from './modules/requests';
import { markupPage, clearContainer } from './modules/markup';
import Notiflix from 'notiflix';

const PER_PAGE = 40;
let pageNum = 1;
let searchData = '';
const refs = {};

window.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  Notiflix.Notify.info('Starting at last!');
  refs.searchForm = document.querySelector('#search-form');
  refs.galleryContainer = document.querySelector('#gallery');
  refs.loadBtn = document.querySelector('.load-more');
  refs.searchForm.addEventListener('submit', onSearchSubmit);
  refs.loadBtn.addEventListener('click', loadMore);
}

async function onSearchSubmit(event) {
  event.preventDefault();
  pageNum = 1;
  clearContainer(refs.galleryContainer);
  searchData = event.currentTarget.elements['searchQuery'].value;
  await makeRequestAndDraw();
}

async function loadMore() {
  pageNum += 1;
  await makeRequestAndDraw();
}

async function makeRequestAndDraw() {
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
  return { totalPages, currentPage: pageNum, images: imageObjArr };
}
