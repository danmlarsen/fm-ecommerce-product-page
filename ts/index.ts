import { Amount } from './Amount';
import { Cart } from './Cart';

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
});

openCartModalBtnElement.addEventListener('click', () => {
    cartModalElement.classList.toggle('cart-modal--show');
});
