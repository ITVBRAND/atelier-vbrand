const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger');
const panel = document.querySelector('.header__panel');

if (header && burger && panel) {
    const setMenu = (isOpen) => {
        header.classList.toggle('header--open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    };

    burger.addEventListener('click', () => {
        setMenu(!header.classList.contains('header--open'));
    });

    panel.addEventListener('click', (event) => {
        if (event.target.closest('.header__link, .header__btn')) {
            setMenu(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            setMenu(false);
        }
    });
}

if (header) {
    const setScrolled = () => {
        header.classList.toggle('header--scroll', window.scrollY > 8);
    };

    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
}
