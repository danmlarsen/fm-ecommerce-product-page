interface CartItem {
    productName: string;
    price: number;
    amount: number;
}

export class Cart {
    private items: CartItem[] = [];

    calcTotal(): number {
        return 0;
    }

    addToCart(item: CartItem): void {
        this.items.push(item);
    }

    removeFromCart(index: number): void {}

    getItems(): CartItem[] {
        return this.items;
    }
}
