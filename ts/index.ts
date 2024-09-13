import { CartForm } from './CartForm';
import { Backdrop } from './Backdrop';
import { Cart } from './Cart';
import { Gallery } from './Gallery';

const cart = new Cart(document.querySelector('.cart-btn__wrapper')!, document.querySelector('.cart-btn')!);
const cartForm = new CartForm(document.querySelector('.product__buy')!, cart);

Gallery.create(document.querySelector('.product__gallery')!);

let backdrop: Backdrop;
document.querySelector('.nav-btn')?.addEventListener('click', () => {
    document.querySelector('.navigation')?.classList.toggle('navigation--show');
    backdrop = Backdrop.create(() => document.querySelector('.navigation')?.classList.remove('navigation--show'));
});

document.querySelector('.navigation__close-btn')?.addEventListener('click', () => {
    backdrop.remove(false);
    document.querySelector('.navigation')?.classList.remove('navigation--show');
});
