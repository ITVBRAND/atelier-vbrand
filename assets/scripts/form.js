const form = document.querySelector('.contact__form');

if (form) {
    const name = form.querySelector('input[name="name"]');
    const phone = form.querySelector('input[name="phone"]');
    const agree = form.querySelector('input[name="agree"]');
    const agreeWrap = form.querySelector('.contact__checkbox--wrap');

    const formatPhone = (value) => {
        let digits = value.replace(/\D/g, '');

        if (digits.startsWith('8')) {
            digits = `7${digits.slice(1)}`;
        }

        if (!digits.startsWith('7')) {
            digits = `7${digits}`;
        }

        digits = digits.slice(0, 11);

        const local = digits.slice(1);
        let formatted = '+7';

        if (!local.length) {
            return formatted;
        }

        formatted += ` (${local.slice(0, 3)}`;

        if (local.length < 3) {
            return formatted;
        }

        formatted += ')';

        if (local.length > 3) {
            formatted += ` ${local.slice(3, 6)}`;
        }

        if (local.length > 6) {
            formatted += ` ${local.slice(6, 8)}`;
        }

        if (local.length > 8) {
            formatted += `-${local.slice(8, 10)}`;
        }

        return formatted;
    };

    phone.addEventListener('focus', () => {
        if (!phone.value) {
            phone.value = '+7';
        }
    });

    phone.addEventListener('input', () => {
        phone.value = formatPhone(phone.value);
        phone.classList.remove('contact__input--error');
    });

    phone.addEventListener('blur', () => {
        if (phone.value === '+7') {
            phone.value = '';
        }
    });

    name.addEventListener('input', () => {
        name.classList.remove('contact__input--error');
    });

    agree.addEventListener('change', () => {
        agreeWrap.classList.remove('contact__checkbox--error');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameOk = name.value.trim().length > 0;
        const phoneOk = phone.value.replace(/\D/g, '').length === 11;
        const agreeOk = agree.checked;

        name.classList.toggle('contact__input--error', !nameOk);
        phone.classList.toggle('contact__input--error', !phoneOk);
        agreeWrap.classList.toggle('contact__checkbox--error', !agreeOk);

        if (!nameOk || !phoneOk || !agreeOk) {
            return;
        }

        form.reset();
    });
}
