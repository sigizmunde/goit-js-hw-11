import Notiflix from 'notiflix';

export function markupPage(container, pageData) {
  if (!pageData.totalPages) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }
  const noteString =
    pageData.totalHits > 1
      ? `Hooray! We found ${pageData.totalHits} images`
      : `Hey! We found one image only`;
  Notiflix.Notify.success(noteString);
  const cards = pageData.images.map(item => markupCard(item));
  container.append(...cards);
  console.log(pageData.currentPage, pageData.totalPages);
  if (pageData.currentPage < pageData.totalPages) {
    showLoadButton();
  } else {
    const warning = document.createElement('p');
    warning.classList.add('end-of-gallery');
    warning.innerText = "We're sorry, but you've reached the end of search results.";
    container.append(warning);
    hideLoadButton();
  }
}

function markupCard(cardData) {
  const card = document.createElement('a');
  card.classList.add('photo-card');
  card.href = cardData.imageURL;
  card.target = '_blank';
  card.rel = 'noopener noreferrer nofollow';
  card.innerHTML = `<img src="${cardData.previewURL}" alt="${cardData.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${cardData.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${cardData.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${cardData.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${cardData.downloads}
    </p>
  </div>`;
  return card;
}

export function clearContainer(container) {
  container.innerHTML = '';
  hideLoadButton();
}

function hideLoadButton() {
  try {
    const btn = document.querySelector('.load-more');
    btn.classList.add('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

function showLoadButton() {
  try {
    const btn = document.querySelector('.load-more');
    btn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}
