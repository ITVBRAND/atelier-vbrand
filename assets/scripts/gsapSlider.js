const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.gsap && window.ScrollTrigger && window.ScrollSmoother) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
        smooth: 0.8,
        effects: false
    });

    const header = document.querySelector('.header');

    if (header && smoother) {
        const syncMenu = () => {
            smoother.paused(header.classList.contains('header--open'));
        };

        new MutationObserver(syncMenu).observe(header, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const reveal = (elements) => {
        gsap.utils.toArray(elements).forEach((element, index) => {
            gsap.from(element, {
                autoAlpha: 0,
                y: 32,
                duration: 0.8,
                delay: index * 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    };

    reveal('.prod__article, .prod__slider');
    reveal('.content__title');
    reveal('.adv__title');
    reveal('.adv__item');
    reveal('.contact__content, .contact__img');
    reveal('.faq__title');
    reveal('.accordion__item');
    reveal('.footer__logo, .footer__content, .footer__copyright');
}

const slider = document.querySelector('.slider');

if (slider && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const slides = gsap.utils.toArray('.slider .slide');

    slides.forEach((slide, index) => {
        const card = slide.querySelector('.slide__card');

        gsap.set(slide, { zIndex: index + 1 });

        if (index === slides.length - 1) {
            return;
        }

        ScrollTrigger.create({
            trigger: slide,
            start: 'top top',
            pin: true,
            pinSpacing: false
        });

        if (!reduceMotion && card && slides[index + 1]) {
            gsap.to(card, {
                scale: 0.94,
                ease: 'none',
                scrollTrigger: {
                    trigger: slides[index + 1],
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true
                }
            });
        }
    });

    if (slides.length > 1) {
        ScrollTrigger.create({
            trigger: slider,
            start: 'top top',
            end: 'bottom bottom',
            snap: {
                snapTo: 1 / (slides.length - 1),
                duration: 0.45,
                delay: 0.08,
                ease: 'power1.inOut'
            }
        });
    }
}
