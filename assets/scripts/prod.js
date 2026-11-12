const prod = document.querySelector('.prod');

if (prod) {
    const track = prod.querySelector('.prod__track');
    const slides = [...track.querySelectorAll('.prod__slide')];
    const pagination = prod.querySelector('.prod__pagination');
    const prev = prod.querySelector('.prod__btn--left');
    const next = prod.querySelector('.prod__btn--right');

    let index = 0;

    const getGap = () => {
        const styles = getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap) || 0;
    };

    const getVisible = () => {
        const value = parseInt(getComputedStyle(prod).getPropertyValue('--prod-visible'), 10);

        if (!Number.isFinite(value) || value < 1) {
            return 1;
        }

        return value;
    };

    const getMaxIndex = () => Math.max(0, slides.length - getVisible());

    const getStep = () => {
        if (!slides.length) {
            return 0;
        }

        return slides[0].getBoundingClientRect().width + getGap();
    };

    const render = (animate) => {
        const maxIndex = getMaxIndex();

        if (index > maxIndex) {
            index = maxIndex;
        }

        track.style.transition = animate ? '' : 'none';
        track.style.transform = `translateX(${-index * getStep()}px)`;
        pagination.textContent = `${index + 1}/${slides.length}`;

        if (!animate) {
            track.getBoundingClientRect();
            track.style.transition = '';
        }
    };

    const move = (direction) => {
        const maxIndex = getMaxIndex();

        index += direction;

        if (index > maxIndex) {
            index = 0;
        }

        if (index < 0) {
            index = maxIndex;
        }

        render(true);
    };

    prev.addEventListener('click', () => {
        move(-1);
    });

    next.addEventListener('click', () => {
        move(1);
    });

    window.addEventListener('resize', () => {
        render(false);
    });

    render(false);
}
