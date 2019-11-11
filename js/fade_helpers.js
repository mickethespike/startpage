/**
 * Fades in an HTML element with CSS animation.
 * @param {HTMLElement} element The element to fade in.
 */
function fadeInElement(element) {
	element.classList.add("fade-in");
}

/**
 * Fades out an HTML element with CSS animation, then removes it.
 * @param {HTMLElement} element The element to fade out and remove.
 */
function fadeOutAndRemoveElement(element) {
	element.addEventListener("animationend", function (ev) {
		if (ev.animationName === "fade-out")
			element.remove();
	});
	element.classList.add("fade-out");
}