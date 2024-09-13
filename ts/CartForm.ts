import { Cart } from './Cart';

import minusIcon from '../assets/images/icon-minus.svg';
import plusIcon from '../assets/images/icon-plus.svg';

export class CartForm {
    maxValue = 9;
    minValue = 0;
    private value = 0;
    private inputElement: HTMLInputElement;
    private addToCartBtnElement: HTMLInputElement;
    private formElement: HTMLElement;

    constructor(private parentElement: Element, private cart: Cart) {
        this.render();

        this.formElement = parentElement.querySelector('.cart-form')!;
        this.inputElement = parentElement.querySelector('.cart-form__amount-input')!;
        this.addToCartBtnElement = parentElement.querySelector('.btn--add-to-cart')!;

        if (this.inputElement.max) {
            this.maxValue = +this.inputElement.max;
        }
        if (this.inputElement.min) {
            this.minValue = +this.inputElement.min;
        }

        this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));
        this.addToCartBtnElement.addEventListener('click', this.onAddToCartClick.bind(this));
        this.inputElement.addEventListener('change', this.onChange.bind(this));
        parentElement.querySelector('.cart-form__amount-btn--increment')!.addEventListener('click', this.onIncrement.bind(this));
        parentElement.querySelector('.cart-form__amount-btn--decrement')!.addEventListener('click', this.onDecrement.bind(this));
    }

    getAmount(): number {
        return this.value;
    }

    reset(): void {
        this.value = 0;
        this.updateElement();
    }

    private addToCart(): void {
        if (this.getAmount() <= 0) return;

        this.cart.addToCart(Cart.createItem(this.getAmount()));
        this.reset();
    }

    private onAddToCartClick(): void {
        this.addToCart();
    }

    private onFormSubmit(e: Event): void {
        e.preventDefault();
        this.addToCart();
    }

    private updateElement(): void {
        this.inputElement.value = this.value === 0 ? '' : this.value.toString();
    }

    private onChange(): void {
        if (+this.inputElement.value > this.maxValue || +this.inputElement.value < this.minValue) {
            this.inputElement.value = '1';
        }

        this.value = +this.inputElement.value;
    }

    private onIncrement(): void {
        if (this.value >= this.maxValue) return;
        this.value++;
        this.updateElement();
    }

    private onDecrement(): void {
        if (+this.value <= this.minValue) return;
        this.value--;
        this.updateElement();
    }

    private render(): void {
        const markup = `
            <form class="cart-form" action="#" method="post" novalidate>
                <div class="cart-form__amount">
                    <button class="cart-form__amount-btn cart-form__amount-btn--decrement" aria-label="Decrease items button" type="button">
                        <img src="${minusIcon}" alt="Minus icon" />
                    </button>
                    <input class="cart-form__amount-input" type="number" name="product-amount" id="product-amount" min="0" max="9" placeholder="0" aria-label="Amount of items" />
                    <button class="cart-form__amount-btn cart-form__amount-btn--increment" aria-label="Increase items button" type="button">
                        <img src="${plusIcon}" alt="Plus icon" />
                    </button>
                </div>
                <button class="btn btn--add-to-cart" aria-label="Add item to cart button">
                    <svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill-rule="nonzero"/></svg>
                    Add to cart
                </button>
            </form>
        `;

        this.parentElement.insertAdjacentHTML('beforeend', markup);
    }
}
