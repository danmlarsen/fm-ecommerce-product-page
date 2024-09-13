import productImg from 'url:../assets/images/image-product-1-thumbnail.jpg';

interface CartItem {
    id: number;
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
        this.modalContentElement.addEventListener('click', this.onClickRemove.bind(this));

        btnElement.addEventListener('click', () => {
            this.modalElement.classList.toggle('cart-modal--show');
        });

        window.addEventListener('click', e => {
            const targetElement = e.target as HTMLElement;
            if (targetElement.closest('.cart-btn')) return;

            if (!targetElement.closest('.cart-modal--show') && this.modalElement.classList.contains('cart-modal--show')) {
                this.modalElement.classList.remove('cart-modal--show');
            }
        });
    }

    static createItem(amount: number = 1): CartItem {
        return {
            id: Math.floor(Date.now() * Math.random()), // This ID is NOT truly random.
            productName: 'Fall Limited Edition Sneakers',
            price: 125.0,
            amount,
        };
    }

    calcTotalAmount(): number {
        return this.items.reduce((acc, cur) => acc + cur.amount, 0);
    }

    addToCart(item: CartItem): void {
        this.items.push(item);

        if (this.items.length === 1) {
            this.renderCart();
        }

        const itemMarkup = `
            <img class="cart-modal__item-img" src="${productImg}" alt="Sneakers image" />
            <div>
                <p class="cart-modal__item-name">Fall Limited Edition Sneakers</p>
                <p class="cart-modal__item-price">$${item.price.toFixed(2)} x ${item.amount} <span class="cart-modal__item-price--total">$${(item.price * item.amount).toFixed(2)}</span></p>
            </div>
            <button class="cart-modal__remove-item-btn" aria-label="Remove item from cart button">
                <svg class="cart-modal__remove-item-icon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill-rule="nonzero" xlink:href="#a"/></svg>
            </button>
        `;

        const itemElement = document.createElement('li');
        itemElement.innerHTML = itemMarkup;
        itemElement.dataset.itemId = item.id.toString();
        itemElement.classList.add('cart-modal__list-item');
        itemElement.classList.add('fade-in');
        itemElement.addEventListener('animationend', () => itemElement.classList.remove('fade-in'));
        this.modalContentElement.querySelector('.cart-modal__list')!.append(itemElement);

        this.renderAmount();
    }

    removeFromCart(removeId: number): void {
        this.items = this.items.filter(item => item.id !== removeId);

        const removeElement = this.modalContentElement.querySelector(`[data-item-id="${removeId}"]`);

        removeElement?.classList.add('fade-out');
        removeElement?.addEventListener('animationend', () => {
            if (this.items.length === 0) {
                this.renderCart();
            }

            removeElement?.remove();
        });

        this.renderAmount();
    }

    getItems(): CartItem[] {
        return this.items;
    }

    onClickRemove(e: Event): void {
        const target = e.target as HTMLElement;
        if (!e.target || !target.closest('button')) return;

        const listItemElement = target.closest('.cart-modal__list-item') as HTMLInputElement;
        const itemId = +listItemElement.dataset.itemId!;

        this.removeFromCart(itemId);
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
                <button class="btn fade-in" aria-label="Checkout button">Checkout</button>
            `;
        }
        this.modalContentElement.innerHTML = markup;
    }
}
