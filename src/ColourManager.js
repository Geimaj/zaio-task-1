import Colour from "./Colour"
import QuantityControls from "./QuantityControls"
import renderTargets from "./render-targets"

export default class ColourManager {
    constructor(colourNames) {
        this.colourNames = colourNames
        this.randomColours = this.getRandomColours()
        this.colourObjects = this.getColourObjects()
        this.selectedColour = this.colourObjects[0]
        this.quantity = 0;

        //simulate a click during load to have default selectedColour
        this.colourClicked(this.colourObjects[0])

        // this.incrementQuantity = this.incrementQuantity.bind(this)
        // this.decrementQuantity = this.decrementQuantity.bind(this)
    }

    incrementQuantity() {
        this.quantity = this.quantity + 1;
        this.render(renderTargets.colourManager)
    }

    decrementQuantity() {
        this.quantity = this.quantity - 1;
        this.render(renderTargets.colourManager)
    }

    getRandomColours(n = 18) {
        let randomColours = []

        while (randomColours.length <= n) {
            const random = Math.floor(Math.random() * this.colourNames.length)
            if (!randomColours.includes(this.colourNames[random])) {
                randomColours.push(this.colourNames[random])
            }
        }
        return randomColours
    }

    getColourObjects() {
        return this.randomColours.map((colour) => {
            const c = new Colour(colour)
            c.onclick = () => this.colourClicked(c);
            return c;
        })
    }

    colourClicked(colour) {
        //uselect everything else
        renderTargets.selectedColourNames.forEach(
            (el) => el.innerText = colour.name)
        this.selectedColour.selected = false;
        //update selected
        this.selectedColour = colour
        this.selectedColour.selected = true
        //reset quantity
        this.quantity = 0

        this.render(renderTargets.colourManager)
    }

    render(where) {
        console.log(where)

        //render colours
        const colourElements = this.colourObjects.map(el => el.render())
        const list = document.createElement("ul")
        list.append(...colourElements)
        where.innerHTML = "";
        where.appendChild(list);

        //render quantity controls
        // let q = document.querySelector("#quantity-controls")
        // renderTargets.quantityControl
        // q.innerHTML = ""
        // q.appendChild(
        //     new QuantityControls(this.quantity,
        //         this.incrementQuantity,
        //         this.decrementQuantity)
        //     .render())
    }
}