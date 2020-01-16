import Colour from "./Colour";
import QuantityControls from "./QuantityControls";
import renderTargets from "./render-targets";
import $ from "jquery";

//element references
const btnQuantityAccept = document.querySelector("#quantity-accept");
const btnQuantityCancel = document.querySelector("#quantity-cancel");
const btnAddToCart = document.querySelector("#addToCart");
const productCount = document.querySelector("#productCount");
const details = document.querySelector("#details");

export default class ColourManager {
	constructor(colourNames) {
		this.colourNames = colourNames;
		this.randomColours = this.getRandomColours();
		this.colourObjects = this.getColourObjects();
		this.selectedColour = this.colourObjects[0];

		this.state = {
			quantity: 0
		};

		//bindings
		this.incrementQuantity = this.incrementQuantity.bind(this);
		this.decrementQuantity = this.decrementQuantity.bind(this);
		this.quantityAccepted = this.quantityAccepted.bind(this);
		this.quantityCanceled = this.quantityCanceled.bind(this);
		this.setState = this.setState.bind(this);

		//event listeners
		btnQuantityAccept.onclick = this.quantityAccepted;
		btnQuantityCancel.onclick = this.quantityCanceled;

		//simulate a click during load to have default selectedColour
		this.colourClicked(this.colourObjects[0]);
	}

	setState(state) {
		this.state = { ...this.state, ...state };
		this.render(renderTargets.colourManager);
	}

	quantityAccepted() {
		btnAddToCart.innerText = "Checkout now";
		productCount.innerText = this.state.quantity;
		//hide modal
		$("#modal").modal("hide");

		//render selectedColour this.state.quantity times
		details.innerHTML = "";
		const colour = this.selectedColour;
		colour.selected = false;
		const colours = new Array(this.state.quantity).fill(colour);
		details.appendChild(this.renderColourList(colours));
	}

	quantityCanceled() {
		//reset UI
		details.innerHTML = "";
		btnAddToCart.innerText = "Add to Cart";
		productCount.innerText = 0;

		this.setState({
			quantity: 0
		});
	}

	incrementQuantity() {
		this.setState({
			quantity: this.state.quantity + 1
		});
	}

	decrementQuantity() {
		if (this.state.quantity > 0) {
			this.setState({
				quantity: this.state.quantity - 1
			});
		}
	}

	getRandomColours(n = 18) {
		let randomColours = [];

		while (randomColours.length <= n) {
			const random = Math.floor(Math.random() * this.colourNames.length);
			if (!randomColours.includes(this.colourNames[random])) {
				randomColours.push(this.colourNames[random]);
			}
		}
		return randomColours;
	}

	getColourObjects() {
		return this.randomColours.map(colour => {
			const c = new Colour(colour);
			c.onclick = () => this.colourClicked(c);
			return c;
		});
	}

	colourClicked(colour) {
		//uselect everything else
		renderTargets.selectedColourNames.forEach(
			el => (el.innerText = colour.name)
		);
		this.selectedColour.selected = false;
		//update selected
		this.selectedColour = colour;
		this.selectedColour.selected = true;
		//reset quantity
		this.setState({
			quantity: 0
		});
	}

	renderColourList(colours) {
		const colourElements = colours.map(el => el.render());
		const list = document.createElement("ul");
		list.append(...colourElements);
		return list;
	}

	render(where) {
		//render colours
		const list = this.renderColourList(this.colourObjects);

		where.innerHTML = "";
		where.appendChild(list);

		//render quantity controls
		let q = renderTargets.quantityControl;
		q.innerHTML = "";
		q.appendChild(
			new QuantityControls(
				this.state.quantity,
				this.incrementQuantity,
				this.decrementQuantity
			).render()
		);
	}
}
