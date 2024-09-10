import { Amount } from './Amount';
import { Cart } from './Cart';
import { Gallery } from './Gallery';

const cart = new Cart(document.querySelector('.cart-btn__wrapper')!, document.querySelector('.cart-btn')!);
const amount = new Amount(document.querySelector('.amount')!);

const addToCartBtnElement = document.querySelector('.btn--add-to-cart')!;

addToCartBtnElement.addEventListener('click', () => {
    if (amount.getAmount() <= 0) return;

    const item = {
        id: Math.floor(Date.now() * Math.random()), // This ID is NOT truly random.
        productName: 'Test',
        price: 125,
        amount: amount.getAmount(),
    };

    cart.addToCart(item);

    amount.reset();
});

const gallery = new Gallery(document.querySelector('.product__gallery')!);
