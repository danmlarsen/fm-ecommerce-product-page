import { Amount } from './Amount';
import { Backdrop } from './Backdrop';
import { Cart } from './Cart';
import { Gallery } from './Gallery';

const cart = new Cart(document.querySelector('.cart-btn__wrapper')!, document.querySelector('.cart-btn')!);
const amount = new Amount(document.querySelector('.amount')!);

document.querySelector('.btn--add-to-cart')!.addEventListener('click', () => {
    if (amount.getAmount() <= 0) return;

    cart.addToCart(Cart.createItem(amount.getAmount()));

    amount.reset();
});

const gallery = new Gallery(document.querySelector('.product__gallery')!);

document.querySelector('.nav-btn')?.addEventListener('click', () => {
    document.querySelector('.navigation')?.classList.toggle('navigation--show');

    Backdrop.create(() => document.querySelector('.navigation')?.classList.remove('navigation--show'));
});
