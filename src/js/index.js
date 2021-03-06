import { getSearchResult } from './modules/requests';
import { markupPage, clearContainer } from './modules/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'self',
  captionType: 'attr',
  captionAttribute: 'title',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: false,
});

const PER_PAGE = 40;
let pageNum = 1;
let searchData = '';
export const refs = {};
export let intersectionObserver;

window.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  refs.searchForm = document.querySelector('#search-form');
  refs.galleryContainer = document.querySelector('#gallery');
  refs.loadBtn = document.querySelector('.load-more');
  refs.scrollCheck = document.querySelector('[name="infinite-scroll"]');
  console.log(refs.scrollCheck);
  refs.searchForm.addEventListener('submit', onSearchSubmit);
  refs.loadBtn.addEventListener('click', loadMore);
  refs.scrollCheck.addEventListener('input', event => {
    if (event.currentTarget.checked) intersectionObserver.observe(refs.loadBtn);
    else intersectionObserver.unobserve(refs.loadBtn);
  });

  const options = {
    // root: null,
    rootMargin: '30px',
    threshold: 1.0,
  };

  intersectionObserver = new IntersectionObserver((entries, observer) => {
    observer.unobserve(refs.loadBtn);
    //so it works once a page
    if (!refs.loadBtn.classList.contains('is-hidden')) {
      refs.loadBtn.click();
    }
  }, options);
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
  try {
    const data = await getData(searchData);
    console.log(data);
    const pageData = parseData(data);
    markupPage(refs.galleryContainer, pageData);
    galleryBox.refresh();
  } catch (error) {
    console.error(error);
  }
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
  return { totalHits: data.total, totalPages, currentPage: pageNum, images: imageObjArr };
}
