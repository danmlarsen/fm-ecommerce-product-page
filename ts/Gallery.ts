import image1 from '../assets/images/image-product-1.jpg';
import image2 from '../assets/images/image-product-2.jpg';
import image3 from '../assets/images/image-product-3.jpg';
import image4 from '../assets/images/image-product-4.jpg';
import thumb1 from '../assets/images/image-product-1-thumbnail.jpg';
import thumb2 from '../assets/images/image-product-2-thumbnail.jpg';
import thumb3 from '../assets/images/image-product-3-thumbnail.jpg';
import thumb4 from '../assets/images/image-product-4-thumbnail.jpg';

import nextIcon from '../assets/images/icon-next.svg';
import prevIcon from '../assets/images/icon-previous.svg';
import closeIcon from '../assets/images/icon-close.svg';

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

    largeImageElement: HTMLImageElement;
    thumbsDivElement: HTMLElement;
    backdrop: HTMLElement | null;

    constructor(private parentElement: Element, private isLightbox = false) {
        if (isLightbox) {
            this.renderLightbox();

            parentElement.querySelector('.gallery__close-btn')!.addEventListener('click', () => {
                this.backdrop?.remove();
                this.parentElement.remove();
            });
        } else {
            this.renderGallery();
        }

        this.largeImageElement = this.parentElement.querySelector('.gallery__large-img')!;
        this.thumbsDivElement = this.parentElement.querySelector('.gallery__thumbs')!;

        this.thumbsDivElement.addEventListener('click', this.onClickThumbnail.bind(this));
        this.parentElement.querySelector('.gallery__btn--previous')!.addEventListener('click', this.previousImage.bind(this));
        this.parentElement.querySelector('.gallery__btn--next')!.addEventListener('click', this.nextImage.bind(this));

        this.largeImageElement.addEventListener('click', () => {
            if (window.innerWidth < SMALL_SCREEN_WIDTH) return;

            new Gallery(document.body, true);
        });

        // this.interval = setInterval(() => {
        //     this.nextImage();
        // }, 5000);
    }

    onClickThumbnail(e: Event): void {
        const target = e.target as HTMLImageElement;
        if (!target || !target.dataset.imageIndex) return;

        // clearInterval(this.interval);
        // this.interval = setInterval(() => {
        //     this.nextImage();
        // }, 5000);

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

        this.largeImageElement.src = this.images[index].imgPath;
        this.selectedImageIndex = index;
    }

    nextImage(): void {
        const newIndex = this.selectedImageIndex < this.images.length - 1 ? this.selectedImageIndex + 1 : 0;

        this.selectImage(newIndex);
    }

    previousImage(): void {
        const newIndex = this.selectedImageIndex === 0 ? this.images.length - 1 : this.selectedImageIndex - 1;

        this.selectImage(newIndex);
    }

    renderGallery(): void {
        const markup = `
            <div class="gallery">
                <figure class="gallery__large">
                    <img src="${image1}" alt="Sneakers" class="gallery__large-img" />

                    <button class="gallery__btn gallery__btn--previous">
                        <img src="${prevIcon}" alt="Left arrow icon">
                    </button>
                    <button class="gallery__btn gallery__btn--next">
                        <img src="${nextIcon}" alt="Right arrow icon">
                    </button>
                </figure>
                <div class="gallery__thumbs">

                    <figure class="gallery__thumbnail gallery__thumbnail--selected">
                        <img src="${thumb1}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="0" />
                    </figure>
                    <figure class="gallery__thumbnail"><img src="${thumb2}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="1" /></figure>
                    <figure class="gallery__thumbnail"><img src="${thumb3}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="2" /></figure>
                    <figure class="gallery__thumbnail"><img src="${thumb4}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="3" /></figure>

                </div>

            </div>
        `;

        this.parentElement.innerHTML = markup;
    }

    renderLightbox(): void {
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('backdrop');
        document.body.append(this.backdrop);

        this.parentElement = document.createElement('div');
        this.parentElement.classList.add('gallery');
        this.parentElement.classList.add('gallery--lightbox');
        this.parentElement.innerHTML = `
                <button class="gallery__close-btn">
                    <img src="${closeIcon}" alt="Close icon" class="gallery__close-icon" />
                </button>
                <figure class="gallery__large">
                    <img src="${image1}" alt="Sneakers" class="gallery__large-img" />
                    <button class="gallery__btn gallery__btn--previous">
                        <img src="${prevIcon}" alt="Left arrow icon">
                    </button>
                    <button class="gallery__btn gallery__btn--next">
                        <img src="${nextIcon}" alt="Right arrow icon">
                    </button>
                </figure>
                <div class="gallery__thumbs">
                    <figure class="gallery__thumbnail gallery__thumbnail--selected">
                        <img src="${thumb1}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="0" />
                    </figure>
                    <figure class="gallery__thumbnail"><img src="${thumb2}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="1" /></figure>
                    <figure class="gallery__thumbnail"><img src="${thumb3}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="2" /></figure>
                    <figure class="gallery__thumbnail"><img src="${thumb4}" alt="Sneakers" class="gallery__thumbnail-img" data-image-index="3" /></figure>
                </div>
        `;
        document.body.append(this.parentElement);
    }
}
