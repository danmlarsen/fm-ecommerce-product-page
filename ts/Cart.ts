import productImg from 'url:../assets/images/image-product-1-thumbnail.jpg';
import trashIcon from 'url:../assets/images/icon-delete.svg';

interface CartItem {
    productName: string;
    price: number;
    amount: number;
}

export class Cart {
    private items: CartItem[] = [];

    calcTotalAmount(): number {
        return this.items.reduce((acc, cur) => acc + cur.amount, 0);
    }

    addToCart(item: CartItem): void {
        this.items.push(item);

        this.renderAmount();
        this.renderCart();
    }

    removeFromCart(removeIndex: number): void {
        this.items = this.items.filter((_, index) => index !== removeIndex);

        this.renderAmount();
        this.renderCart();
    }

    getItems(): CartItem[] {
        return this.items;
    }

    renderAmount(): void {
        const cartBtnElement = document.querySelector('.cart-btn__amount')!;

        const totalAmount = this.calcTotalAmount();

        if (totalAmount === 0) {
            cartBtnElement.classList.remove('cart-btn__amount--show');
        }
        else {
            cartBtnElement.textContent = totalAmount.toString();
            cartBtnElement.classList.add('cart-btn__amount--show');
        }
    }

    renderCart(): void {
        let markup: string;
        if (this.items.length === 0) {
            markup = `<p>Your cart is empty</p>`;
        } else {
            const cartItemsMarkup = this.items.map((item, index) => {
                return `
                    <li class="cart-modal__list-item">
                        <img class="cart-modal__item-img" src="${productImg}" alt="Sneakers" />
                        <div>
                            <p class="cart-modal__item-name">Fall Limited Edition Sneakers</p>
                            <p class="cart-modal__item-price">$${item.price} x ${item.amount} <span class="cart-modal__item-price--total">$${item.price * item.amount}</span></p>
                        </div>
                        <button class="cart-modal__remove-item-btn" data-item-index="${index}">
                            <img src="${trashIcon}" alt="Trash bin" />
                        </button>
                    </li>
                `;
            });
            markup = `
                <ul class="cart-modal__list">${cartItemsMarkup.join('')}</ul>
                <button class="btn">Checkout</button>
            `;
        }
        document.querySelector('.cart-modal__content')!.innerHTML = markup;
    }
}
