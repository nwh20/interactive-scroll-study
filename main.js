(() => {
    const actions = {
        animation1 (key) {
            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        animation2 (key) {
            if (key) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    }

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');

    let currentItem = graphicElems[0];

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex)
    });

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);

        stepElems[i].setAttribute('data-index', i);
        graphicElems[i].setAttribute('data-index', i);
    }

    const activate = (action) => {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    const inactivate = (action) => {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            if (!step) continue;

            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            scrollTo(0, 0);
        }, 100)
    })

    activate();

})();