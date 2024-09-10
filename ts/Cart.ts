import productImg from 'url:../assets/images/image-product-1-thumbnail.jpg';
import trashIcon from 'url:../assets/images/icon-delete.svg';

interface CartItem {
    productName: string;
    price: number;
    amount: number;
}

export class Cart {
    private items: CartItem[] = [];
    private modalElement: HTMLElement;
    private modalContentElement: HTMLElement;

    constructor(private parentElement: HTMLElement, private btnElement: HTMLElement) {
        this.renderModal();

        this.modalContentElement = this.modalElement.querySelector('.cart-modal__content')!;

        this.modalContentElement.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (!e.target || !target.closest('button')) return;

            const btn = target.closest('button') as HTMLInputElement;
            const index = +btn.dataset.itemIndex!;

            this.removeFromCart(index);
        });

        btnElement.addEventListener('click', () => {
            this.modalElement.classList.toggle('cart-modal--show');
        });
    }

    calcTotalAmount(): number {
        return this.items.reduce((acc, cur) => acc + cur.amount, 0);
    }

    addToCart(item: CartItem): void {
        const index = this.items.push(item) - 1;

        if (this.items.length === 1) {
            this.renderCart();
        }

        const itemMarkup = `
            <li class="cart-modal__list-item fade-in" data-item-index="${index}">
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

        this.modalContentElement.querySelector('.cart-modal__list')!.insertAdjacentHTML('beforeend', itemMarkup);

        this.renderAmount();
    }

    removeFromCart(removeIndex: number): void {
        this.items = this.items.filter((_, index) => index !== removeIndex);

        const element = this.modalContentElement.querySelector(`[data-item-index="${removeIndex}"]`);

        element?.classList.add('fade-out');
        element?.addEventListener('animationend', () => {
            if (this.items.length === 0) {
                this.renderCart();
            }

            element?.remove();
        });

        this.renderAmount();
    }

    getItems(): CartItem[] {
        return this.items;
    }

    renderAmount(): void {
        const cartAmountElement = this.btnElement.querySelector('.cart-btn__amount')!;

        const totalAmount = this.calcTotalAmount();

        if (totalAmount === 0) {
            cartAmountElement.classList.remove('cart-btn__amount--show');
        } else {
            cartAmountElement.textContent = totalAmount.toString();
            cartAmountElement.classList.add('cart-btn__amount--show');
        }
    }

    renderModal(): void {
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('cart-modal');
        this.modalElement.innerHTML = `
            <div class="cart-modal__title">
                <p>Cart</p>
            </div>
            <div class="cart-modal__content">
                <p>Your cart is empty</p>
            </div>
        `;
        this.parentElement.append(this.modalElement);
    }

    renderCart(): void {
        let markup: string;
        if (this.items.length === 0) {
            markup = `<p>Your cart is empty</p>`;
        } else {
            markup = `
                <ul class="cart-modal__list"></ul>
                <button class="btn">Checkout</button>
            `;
        }
        this.modalContentElement.innerHTML = markup;
    }
}
