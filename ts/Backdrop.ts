export class Backdrop {
    private backdropElement: HTMLElement;

    static create(clickedCallback: () => void = () => {}): Backdrop {
        return new Backdrop(clickedCallback);
    }

    constructor(private clickedCallback: () => void) {
        this.backdropElement = document.createElement('div');
        this.backdropElement.classList.add('backdrop');
        this.backdropElement.classList.add('fade-in');
        document.body.append(this.backdropElement);

        this.backdropElement.addEventListener('click', this.onClickBackdrop);
    }

    private onClickBackdrop: () => void = () => {
        this.remove();
    };

    private onFadeAnimationEnd: () => void = () => {
        this.backdropElement.remove();
    };

    remove(callback: boolean = true): void {
        this.backdropElement.classList.add('fade-out');
        this.backdropElement.addEventListener('animationend', this.onFadeAnimationEnd);

        if (callback) {
            this.clickedCallback();
        }
    }
}
