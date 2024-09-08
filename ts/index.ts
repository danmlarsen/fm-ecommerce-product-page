import { Amount } from './Amount';
import { Cart } from './Cart';
import { Gallery } from './Gallery';

const addToCartBtnElement = document.querySelector('.btn__add-to-cart')!;
const openCartModalBtnElement = document.querySelector('.cart-btn')!;
const cartModalElement = document.querySelector('.cart-modal')! as HTMLElement;

const cart = new Cart();
const amount = new Amount(document.querySelector('.amount')!);

addToCartBtnElement.addEventListener('click', () => {
    if (amount.getAmount() <= 0) return;

    const item = {
        productName: 'Test',
        price: 125,
        amount: amount.getAmount(),
    };

    cart.addToCart(item);

    amount.reset();
});

openCartModalBtnElement.addEventListener('click', () => {
    cartModalElement.classList.toggle('cart-modal--show');
});

document.querySelector('.cart-modal__content')!.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (!e.target || !target.closest('button')) return;

    const btn = target.closest('button') as HTMLInputElement;
    const index = +btn.dataset.itemIndex!;

    cart.removeFromCart(index);
});

const gallery = new Gallery(document.querySelector('.product__gallery')!);
