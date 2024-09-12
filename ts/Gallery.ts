import { Backdrop } from './Backdrop';

import image1 from '../assets/images/image-product-1.jpg';
import image2 from '../assets/images/image-product-2.jpg';
import image3 from '../assets/images/image-product-3.jpg';
import image4 from '../assets/images/image-product-4.jpg';
import thumb1 from '../assets/images/image-product-1-thumbnail.jpg';
import thumb2 from '../assets/images/image-product-2-thumbnail.jpg';
import thumb3 from '../assets/images/image-product-3-thumbnail.jpg';
import thumb4 from '../assets/images/image-product-4-thumbnail.jpg';

const SMALL_SCREEN_WIDTH = 768;

interface imageItem {
    imgPath: string;
    thumbPath: string;
    alt: string;
}

export class Gallery {
    images: imageItem[] = [
        { imgPath: image1, thumbPath: thumb1, alt: 'Sneakers' },
        { imgPath: image2, thumbPath: thumb2, alt: 'Sneakers' },
        { imgPath: image3, thumbPath: thumb3, alt: 'Sneakers' },
        { imgPath: image4, thumbPath: thumb4, alt: 'Sneakers' },
    ];

    selectedImageIndex: number = 0;
    interval: number;

    galleryElement: HTMLElement;
    largeImageContainerElement: HTMLElement;
    carouselElement: HTMLElement;
    largeImageElement: HTMLImageElement;
    thumbsDivElement: HTMLElement;
    backdrop: Backdrop | null;

    constructor(private parentElement: Element, private isLightbox = false) {
        this.render();

        if (this.isLightbox) {
            this.galleryElement.querySelector('.gallery__close-btn')!.addEventListener('click', () => this.remove());
        }

        this.largeImageContainerElement = this.galleryElement.querySelector('.gallery__large-images')!;
        this.carouselElement = this.galleryElement.querySelector('.gallery__carousel')!;
        this.largeImageElement = this.galleryElement.querySelector('.gallery__large-img')!;
        this.thumbsDivElement = this.galleryElement.querySelector('.gallery__thumbs')!;

        this.thumbsDivElement.addEventListener('click', this.onClickThumbnail.bind(this));
        this.galleryElement.querySelector('.gallery__btn--previous')!.addEventListener('click', this.previousImage.bind(this));
        this.galleryElement.querySelector('.gallery__btn--next')!.addEventListener('click', this.nextImage.bind(this));

        this.largeImageContainerElement.addEventListener('click', () => {
            if (this.isLightbox || window.innerWidth < SMALL_SCREEN_WIDTH) return;

            new Gallery(document.body, true);
        });
    }

    onClickThumbnail(e: Event): void {
        const target = e.target as HTMLImageElement;
        if (!target || !target.dataset.imageIndex) return;

        const index = +target.dataset.imageIndex;
        this.selectImage(index);
    }

    selectImage(index: number): void {
        this.thumbsDivElement.querySelectorAll('.gallery__thumbnail-img').forEach(element => {
            const img = element as HTMLElement;
            const imgIndex = +img.dataset.imageIndex!;

            if (imgIndex === index) {
                element.closest('figure')?.classList.add('gallery__thumbnail--selected');
            } else {
                element.closest('figure')?.classList.remove('gallery__thumbnail--selected');
            }
        });

        this.selectedImageIndex = index;

        this.carouselElement.style.transform = `translateX(${-100 * index}%)`;
    }

    nextImage(): void {
        const newIndex = this.selectedImageIndex < this.images.length - 1 ? this.selectedImageIndex + 1 : 0;

        this.selectImage(newIndex);
    }

    previousImage(): void {
        const newIndex = this.selectedImageIndex === 0 ? this.images.length - 1 : this.selectedImageIndex - 1;

        this.selectImage(newIndex);
    }

    remove(): void {
        if (this.backdrop) {
            this.backdrop.remove(false);
            this.backdrop = null;
        }

        this.galleryElement.classList.add('fade-out');
        this.galleryElement.addEventListener('animationend', () => {
            this.galleryElement.remove();
        });
    }

    render(): void {
        this.galleryElement = document.createElement('div');
        this.galleryElement.classList.add('gallery');

        if (this.isLightbox) {
            this.backdrop = Backdrop.create(() => this.remove());

            this.galleryElement.classList.add('gallery--lightbox');
            this.galleryElement.classList.add('fade-in');

            this.galleryElement.insertAdjacentHTML(
                'beforeend',
                `
                <button class="gallery__close-btn">
                    <svg alt="Close icon" class="gallery__close-icon" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>
                </button>`
            );
        }

        const markup = `
            <figure class="gallery__large">
                <div class="gallery__large-images">
                    <div class="gallery__carousel">
                        <img src="${thumb1}" alt="Sneakers" class="gallery__large-img gallery__large-img-loading" data-image-index="0" data-image-src="${image1}" />
                        <img src="${thumb2}" alt="Sneakers" class="gallery__large-img gallery__large-img-loading" data-image-index="1" data-image-src="${image2}" />
                        <img src="${thumb3}" alt="Sneakers" class="gallery__large-img gallery__large-img-loading" data-image-index="2" data-image-src="${image3}" />
                        <img src="${thumb4}" alt="Sneakers" class="gallery__large-img gallery__large-img-loading" data-image-index="3" data-image-src="${image4}" />
                    </div>
                </div>

                <button class="gallery__btn gallery__btn--previous">
                    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                </button>
                <button class="gallery__btn gallery__btn--next">
                    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                </button>
            </figure>
            <div class="gallery__thumbs">

                <figure class="gallery__thumbnail gallery__thumbnail--selected"><img src="${thumb1}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="0" /></figure>
                <figure class="gallery__thumbnail"><img src="${thumb2}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="1" /></figure>
                <figure class="gallery__thumbnail"><img src="${thumb3}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="2" /></figure>
                <figure class="gallery__thumbnail"><img src="${thumb4}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="3" /></figure>

            </div>`;

        this.galleryElement.insertAdjacentHTML('beforeend', markup);

        this.galleryElement.querySelectorAll('.gallery__large-img').forEach(element => {
            const imgElement = element as HTMLImageElement;
            const img = new Image();
            img.src = imgElement.dataset.imageSrc!;
            img.onload = () => {
                imgElement.src = imgElement.dataset.imageSrc!;
                imgElement.classList.remove('gallery__large-img-loading');
            };
        });

        if (this.isLightbox) {
            document.body.append(this.galleryElement);
        } else {
            this.parentElement.append(this.galleryElement);
        }
    }
}
