const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.getElementById("gradient");
const randomButton = document.querySelector(".random-button");

const bodyStyle = window.getComputedStyle(body);

const RGB_REGEX = /rgb\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)/g;

document.addEventListener("DOMContentLoaded", showStyleGrad);
document.addEventListener("DOMContentLoaded", setInputValues);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
randomButton.addEventListener("click", setRandomGradient);

function setInputValues() {
  [color1.value, color2.value] = getGradientHexColors();
}

function setGradient() {
  body.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";

  showStyleGrad();
}

function showStyleGrad() {
  css.textContent = bodyStyle.backgroundImage + ";"
}

function setRandomGradient() {
  body.style.background = `linear-gradient(to right, ${createRandomHexColor()}, ${createRandomHexColor()})`;

  setRandomInputColors();
  showStyleGrad();
}

function setRandomInputColors() {
  [color1.value, color2.value] = getGradientHexColors();
}

function getGradientHexColors() {
  return bodyStyle.backgroundImage.match(RGB_REGEX).map(rgbStrs => rgbToHex(rgbStrs));
}

function createRandomHexColor() {
  const HEX_LENGTH = 6;
  let randomHexColor = '#';

  for (let i = 0; i < HEX_LENGTH; i++) {
    const character = Math.floor(Math.random() * 16).toString(16);
    randomHexColor = randomHexColor + character;
  }

  return randomHexColor;
}

function rgbToHex(rgbColor) {
  const hex = rgbColor.match(/\d+/g)
    .map(component => Number(component))
    .map(decimal => decimal.toString(16).padStart(2, '0'))
    .join("");

  return `#${hex}`;
}