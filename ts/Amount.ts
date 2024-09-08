export class Amount {
    private inputElement: HTMLInputElement;

    constructor(private parentElement: Element) {
        this.inputElement = parentElement.querySelector('.amount__input')!;
        parentElement.querySelector('.amount__btn--increment')!.addEventListener('click', this.onIncrement.bind(this));
        parentElement.querySelector('.amount__btn--decrement')!.addEventListener('click', this.onDecrement.bind(this));
    }

    getAmount(): number {
        return +this.inputElement.value;
    }

    reset(): void {
        this.inputElement.value = '0';
    }

    onIncrement(): void {
        if (+this.inputElement.value >= +this.inputElement.max) return;

        const newNumber = +this.inputElement.value + 1;

        this.inputElement.value = newNumber.toString();
    }

    onDecrement(): void {
        if (+this.inputElement.value <= +this.inputElement.min) return;

        const newNumber = +this.inputElement.value - 1;

        this.inputElement.value = newNumber.toString();
    }
}
