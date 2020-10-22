(() => {
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');

    let currentItem = graphicElems[0];

    for (let i = 0; i < stepElems.length; i++) {
        stepElems[i].setAttribute('data-index', i);
        graphicElems[i].setAttribute('data-index', i);
    }

    const activate = () => {
        currentItem.classList.add('visible');
    }

    const inactivate = () => {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for (let i = 0; i < stepElems.length; i++) {
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate();
            }
        }
    });

    activate();

})();