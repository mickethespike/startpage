function fadeIn(element) {
    let op = 0.01;  // initial opacity
    const timer = setInterval(() => {
        if (op >= 1) {
            clearInterval(timer);
            op = 1;
        }

        element.style.opacity = op;
        element.style.filter = `alpha(opacity=${op * 100})`;
        op += 0.2;
    }, 25);
}

function fadeOutAndRemove(element) {
    let op = 1;  // initial opacity
    const timer = setInterval(() => {
        if (op <= 0) {
            clearInterval(timer);
            element.remove();
            return;
        }

        element.style.opacity = op;
        element.style.filter = `alpha(opacity=${op * 100})`;
        op -= 0.15;
    }, 25);
}