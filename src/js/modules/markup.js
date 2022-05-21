export function markupPage(container, pageData) {
  if (!pageData.totalPages) {
    alert('no images found');
    return;
  }
  const cards = pageData.images.map(item => markupCard(item));
  container.append(...cards);
  console.log(pageData.currentPage, pageData.totalPages);
  if (pageData.currentPage < pageData.totalPages) {
    showLoadButton();
  } else {
    hideLoadButton();
  }
}

function markupCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('photo-card');
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

export function hideLoadButton() {
  try {
    const btn = document.querySelector('.load-more');
    btn.classList.add('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

export function showLoadButton() {
  try {
    const btn = document.querySelector('.load-more');
    btn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}
