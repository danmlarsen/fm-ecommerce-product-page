export class Amount {
    maxValue = 9;
    minValue = 0;
    private value = 0;
    private inputElement: HTMLInputElement;

    constructor(private parentElement: Element) {
        this.inputElement = parentElement.querySelector('.amount__input')!;

        if (this.inputElement.max) {
            this.maxValue = +this.inputElement.max;
        }
        if (this.inputElement.min) {
            this.minValue = +this.inputElement.min;
        }

        parentElement.querySelector('.amount__btn--increment')!.addEventListener('click', this.onIncrement.bind(this));
        parentElement.querySelector('.amount__btn--decrement')!.addEventListener('click', this.onDecrement.bind(this));
    }

    getAmount(): number {
        return this.value;
    }

    reset(): void {
        this.value = 0;
        this.updateElement();
    }

    private updateElement(): void {
        this.inputElement.value = this.value.toString();
    }

    private onIncrement(): void {
        if (this.value >= this.maxValue) return;
        this.value++;
        this.updateElement();
    }

    private onDecrement(): void {
        if (+this.value <= this.minValue) return;
        this.value--;
        this.updateElement();
    }
}
