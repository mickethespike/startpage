'use strict';

const colorStyleLink = document.querySelector('link[href="./css/dark.css"]');
const useDarkThemeTag = 'useDarkTheme';
const showDonationButtonTag = 'showDonationButton';

function setTheme(isDark) {
    const themeSlider = document.getElementById('theme-input');
    const themeDesc = document.getElementById('theme-state-desc');
    setThemeLink(isDark);
    themeDesc.innerHTML = isDark ? 'Dark' : 'Light';
    themeSlider.checked = isDark;
    localStorage.setItem(useDarkThemeTag, isDark);
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
    localStorage.setItem(showDonationButtonTag, isVisible);
}

function getLocalBool(key) {
    return localStorage.getItem(key) == 'true';
}

if (localStorage.getItem(useDarkThemeTag) != '') {
    setThemeLink(getLocalBool(useDarkThemeTag));
}

window.onload = () => {
    if (localStorage.getItem(useDarkThemeTag) != '') {
        setTheme(getLocalBool(useDarkThemeTag));
    }

    if (localStorage.getItem(showDonationButtonTag) != '') {
        setDonationVisible(getLocalBool(showDonationButtonTag));
    } else {
        setDonationVisible(true);
    }
};