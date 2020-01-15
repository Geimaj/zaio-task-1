import 'bootstrap';
import './index.scss'
import colours from "./colors"

const NUM_COLOURS = 18;
const colourContainer = document.querySelector("#colours")

function getRandomColours(colours, n = NUM_COLOURS) {
    let randomColours = []

    while (randomColours.length <= n) {
        const random = Math.floor(Math.random() * colours.length)
        if (!randomColours.includes(colours[random])) {
            randomColours.push(colours[random])
        }
    }
    return randomColours
}

function renderColours(colours) {
    const colourElements = colours.map((color) => {
        const li = document.createElement("li")
        li.innerText = "x";
        li.style.backgroundColor = color;

        return li;
    })

    const list = document.createElement("ul")
    list.append(...colourElements)

    colourContainer.appendChild(list);
}


function updateColourNames(selectedColour, colourNames) {
    if (selectedColour >= 0 && selectedColour <= colourNames.length) {
        console.log(selectedColour)

        document.querySelectorAll(".selectedColourName").forEach((el) => el.innerText = colourNames[selectedColour])

    } else {
        alert('Invalid colour selected')
    }
}

const randomColours = getRandomColours(colours, NUM_COLOURS)

renderColours(randomColours);
updateColourNames(0, randomColours);