export function markupPage(container, pageData) {
  //   let list = container.querySelector('#image-list');
  //   if (!list) {
  //     list = document.createElement('ul');
  //     list.id = 'image-list';
  //     list.classList.add('image-list');
  //     container.appendChild(list);
  //   }
  const cards = pageData.images.map(item => markupCard(item));
  container.append(...cards);
}

function markupCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('photo-card');
  card.innerHTML = `<img src="${cardData.previewURL}" alt="${cardData.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>❤️${cardData.likes}</b>
    </p>
    <p class="info-item">
      <b>👀${cardData.views}</b>
    </p>
    <p class="info-item">
      <b>🖊️${cardData.comments}</b>
    </p>
    <p class="info-item">
      <b>⬇️${cardData.downloads}</b>
    </p>
  </div>`;
  return card;
}
