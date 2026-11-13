export function animIn(elem: HTMLElement, animTime: number, startingScale: number, delay = 0): Animation {
    elem.getAnimations().forEach(anim => {
        anim.cancel()
    });
    elem.style.opacity = "1";
    elem.style.transform = "scale(1)";
    return elem.animate(
        [
            {opacity: 0, transform: `scale(${startingScale})`, easing: "steps(3, end)"},
            {opacity: 1, transform: "scale(1)"},
        ],
        {
            delay: delay,
            duration: animTime,
            fill: "backwards",
        }
    );
}

export function animOut(elem: HTMLElement, animTime: number, endingScale: number, delay = 0): Animation {
    elem.getAnimations().forEach(anim => {anim.cancel()});
    elem.style.opacity = "0";
    elem.style.transform = `scale(${endingScale})`;
    return elem.animate(
        [
            {opacity: 1, transform: "scale(1)", easing: "steps(3, end)"},
            {opacity: 0, transform: `scale(${endingScale})`},
        ],
        {
            delay: delay,
            duration: animTime,
            fill: "backwards",
        }
    );
}