'use strict';

const colorStyleLink = document.querySelector('link[href="./css/light.css"]');

const useDarkThemeTag = 'useDarkTheme';
const themeSlider = document.getElementById('theme-input');
const themeDesc = document.getElementById('theme-state-desc');

const showDonationButtonTag = 'showDonationButton';
const donationWidget = document.getElementById('coffee-btn');
const donationSlider = document.getElementById('donation-input');
const donationDesc = document.getElementById('donation-state-desc');

function setTheme(isDark) {
    if (isDark) {
        colorStyleLink.setAttribute('href', './css/dark.css');
        themeDesc.innerHTML = "Dark";
    } else {
        colorStyleLink.setAttribute('href', './css/light.css');
        themeDesc.innerHTML = "Light";
    }
    themeSlider.checked = isDark;
    localStorage.setItem(useDarkThemeTag, isDark);
}

function setDonationVisible(isVisible) {
    if (isVisible) {
        donationWidget.style.display = 'block';
        donationDesc.innerHTML = "Show";
    } else {
        donationWidget.style.display = 'none';
        donationDesc.innerHTML = "Hide";
    }
    donationSlider.checked = isVisible;
    localStorage.setItem(showDonationButtonTag, isVisible);
}

function getLocalBool(key) {
    return localStorage.getItem(key) == 'true';
}

if (localStorage.getItem(useDarkThemeTag) != '') {
    setTheme(getLocalBool(useDarkThemeTag));
}

if (localStorage.getItem(showDonationButtonTag) != '') {
    setDonationVisible(getLocalBool(showDonationButtonTag));
} else {
    setDonationVisible(true);
}