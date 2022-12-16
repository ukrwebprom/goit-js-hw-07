import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");
const gallery = makeGallery(galleryItems);
galleryContainer.insertAdjacentHTML("afterbegin", gallery);
galleryContainer.addEventListener("click", onGalleryItemClick);
const instance = basicLightbox.create(
  `<img width="1400" height="900" src="">`,
  {
    onClose: (instance) => {
      window.removeEventListener("keydown", onKeyPressed);
    },
  }
);

function makeGallery(galleryData) {
  return galleryData
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
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
    .join("");
}

function onGalleryItemClick(e) {
  e.preventDefault();
  if (e.target.nodeName != "IMG") {
    return;
  }

  const imgSrc = e.target.dataset.source;
  instance.element().querySelector("img").src = imgSrc;
  instance.show();
  window.addEventListener("keydown", onKeyPressed);
}

function onKeyPressed(e) {
  if (e.code != "Escape") {
    return;
  }
  instance.close();
}
