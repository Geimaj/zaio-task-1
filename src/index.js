import 'bootstrap';
import './index.scss'
import colours from "./colors"

const colourContainer = document.querySelector("#colours")

function getRandomColours(colours, n = 18) {
    let randomColours = []

    while (randomColours.length <= 18) {
        const random = Math.floor(Math.random() * colours.length)
        if (!randomColours.includes(colours[random])) {
            randomColours.push(colours[random])
        }
    }
    return randomColours
}

function renderColours() {
    const colourElements = getRandomColours(colours, 18).map((color) => {
        const li = document.createElement("li")
        li.innerText = "x";
        li.style.backgroundColor = color;

        return li;
    })

    const list = document.createElement("ul")
    list.append(...colourElements)

    colourContainer.appendChild(list);
}

renderColours();

console.log(colours)