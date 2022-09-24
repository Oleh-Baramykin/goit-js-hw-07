import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryCardMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);
function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const isImage = evt.target.classList.contains('gallery__image');
  if (!isImage) {
    return;
  }

  const instance = basicLightbox.create(`
        <div class="modal">
            <img src="${evt.target.dataset.source}"/>
        </div>
    `);
  instance.show();

  document.addEventListener('keydown', closeModal);
  function closeModal(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }
}
