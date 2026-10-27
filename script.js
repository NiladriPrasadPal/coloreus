const colorDisplay = document.querySelector(".color-display");
const colorCode = document.querySelector("#color-code");
const generateBtn = document.querySelector("#generate-btn");
const guessBtn = document.querySelector("#guess-btn");

const guessPreview = document.querySelector(".guess-preview");
const result = document.querySelector("#result");

const redSlider = document.querySelector("#red");
const greenSlider = document.querySelector("#green");
const blueSlider = document.querySelector("#blue");

const redValue = document.querySelector("#red-value");
const greenValue = document.querySelector("#green-value");
const blueValue = document.querySelector("#blue-value");

let targetRed;
let targetGreen;
let targetBlue;

function generateRandomColor() {
    targetRed = Math.floor(Math.random() * 256);
    targetGreen = Math.floor(Math.random() * 256);
    targetBlue = Math.floor(Math.random() * 256);

    const targetHex = rgbToHex(
        targetRed,
        targetGreen,
        targetBlue
    );

    colorDisplay.style.backgroundColor = targetHex;
    colorCode.textContent = "???";

    redSlider.value = 128;
    greenSlider.value = 128;
    blueSlider.value = 128;

    result.innerHTML = "";

    updateGuess();
}

function rgbToHex(red, green, blue) {
    return "#" +
        red.toString(16).padStart(2, "0") +
        green.toString(16).padStart(2, "0") +
        blue.toString(16).padStart(2, "0");
}

function updateGuess() {
    const red = Number(redSlider.value);
    const green = Number(greenSlider.value);
    const blue = Number(blueSlider.value);

    redValue.textContent = red;
    greenValue.textContent = green;
    blueValue.textContent = blue;

    guessPreview.style.backgroundColor =
        `rgb(${red}, ${green}, ${blue})`;
}

function checkGuess() {
    const red = Number(redSlider.value);
    const green = Number(greenSlider.value);
    const blue = Number(blueSlider.value);

    const redDifference = Math.abs(targetRed - red);
    const greenDifference = Math.abs(targetGreen - green);
    const blueDifference = Math.abs(targetBlue - blue);

    const totalDifference =
        redDifference + greenDifference + blueDifference;

    const score = Math.round(
        (1 - totalDifference / 765) * 100
    );

    const similarity = score;

    const targetHex = rgbToHex(
        targetRed,
        targetGreen,
        targetBlue
    );

    colorCode.textContent = targetHex;

    let message;

    if (score === 100) {
        message = "PERFECT! YOU GOT IT!";
    } else if (score >= 90) {
        message = "INCREDIBLE! SO CLOSE!";
    } else if (score >= 75) {
        message = "GREAT GUESS!";
    } else if (score >= 50) {
        message = "NOT BAD! KEEP TRYING!";
    } else {
        message = "KEEP PRACTISING!";
    }

    result.innerHTML = `
        <h3>${message}</h3>
        <p>Your Score: ${score}/100</p>
        <p>Colour Similarity: ${similarity}%</p>
        <div class="result-colors">
            <div>
                <div class="result-swatch target-swatch"></div>
                <p>Target</p>
                <span>${targetHex}</span>
            </div>
            <div>
                <div class="result-swatch guess-swatch"></div>
                <p>Your Guess</p>
                <span>${rgbToHex(red, green, blue)}</span>
            </div>
        </div>
    `;

    result.querySelector(".target-swatch").style.backgroundColor =
        targetHex;

    result.querySelector(".guess-swatch").style.backgroundColor =
        `rgb(${red}, ${green}, ${blue})`;
}

redSlider.addEventListener("input", updateGuess);
greenSlider.addEventListener("input", updateGuess);
blueSlider.addEventListener("input", updateGuess);

guessBtn.addEventListener("click", checkGuess);
generateBtn.addEventListener("click", generateRandomColor);

generateRandomColor();
