'use strict';

const colorStyleLink = document.querySelector('link[href="./css/dark.css"]');
const useDarkThemeTag = 'useDarkTheme';
const showDonationButtonTag = 'showDonationButton';

function setTheme(isDark) {
    const themeSlider = document.getElementById('theme-input');
    const themeDesc = document.getElementById('theme-state-desc');
    setThemeLink(isDark);
    themeSlider.checked = isDark;
    themeDesc.innerHTML = isDark ? 'Dark' : 'Light';
	getLocalStorage().setItem(useDarkThemeTag, isDark);
}

function setThemeLink(isDark) {
    colorStyleLink.setAttribute('href', isDark ? './css/dark.css' : './css/light.css');
}

function setDonationVisible(isVisible) {
    const donationWidget = document.getElementById('coffee-btn');
    const donationDesc = document.getElementById('donation-state-desc');
    if (isVisible) {
        donationWidget.style.display = 'block';
        donationDesc.innerHTML = "Show";
    } else {
        donationWidget.style.display = 'none';
        donationDesc.innerHTML = "Hide";
    }
    document.getElementById('donation-input').checked = isVisible;
    getLocalStorage().setItem(showDonationButtonTag, isVisible);
}

function loadSettings() {
    setTheme(getLocalBool(useDarkThemeTag));
}

setThemeLink(getLocalBool(useDarkThemeTag));