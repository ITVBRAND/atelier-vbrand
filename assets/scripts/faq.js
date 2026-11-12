const accordion = document.querySelector('.accordion');

if (accordion) {
    const items = [...accordion.querySelectorAll('.accordion__item')];

    const setItem = (item, isOpen) => {
        item.classList.toggle('accordion__item--open', isOpen);
        item.setAttribute('aria-expanded', String(isOpen));
    };

    items.forEach((item) => {
        item.setAttribute('tabindex', '0');
        setItem(item, item.classList.contains('accordion__item--open'));

        const toggle = () => {
            const isOpen = item.classList.contains('accordion__item--open');

            items.forEach((other) => {
                setItem(other, false);
            });

            setItem(item, !isOpen);
        };

        item.addEventListener('click', toggle);

        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });
}
