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

        this.inputElement.addEventListener('change', this.onChange.bind(this));
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

    private onChange(): void {
        if (+this.inputElement.value > this.maxValue || +this.inputElement.value < this.minValue) {
            this.inputElement.value = '1';
        }

        this.value = +this.inputElement.value;
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
