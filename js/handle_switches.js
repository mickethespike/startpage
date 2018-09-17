/*
function toggle_coffee() {
    ('#toggle-coffee')
}

function toggle_theme() {
    ('#toggle-mode')
}
*/

const colorStyleLink = document.querySelector('link[href="./css/light.css"]');
const donationWidget = document.getElementById('coffee-btn');
const themeSlider = document.getElementById('theme-input');
const donationSlider = document.getElementById('donation-input');
let isCurrentlyDark = false;

function setTheme(isDark) {
    if (isCurrentlyDark != isDark) {
        if (isDark) {
            colorStyleLink.setAttribute('href', './css/dark.css');
        } else {
            colorStyleLink.setAttribute('href', './css/light.css');
        }
        isCurrentlyDark = isDark;
    }
}

function setDonationVisible(isVisible) {
    if (isVisible) {
        donationWidget.style.display = 'block';
    } else {
        donationWidget.style.display = 'none';
    }
}