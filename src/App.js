import ColourList, { getRandomColours } from "./components/ColourList";
import QuantityControls from "./components/QuantityControls";
import colourNames from "./colors";
import $ from "jquery";

export default class App {
	constructor(refs) {
		this.refs = refs;

		//create components
		this.components = {
			colourList: new ColourList(getRandomColours(18, colourNames)),
			quantityControls: new QuantityControls()
		};

		this.update = this.update.bind(this);
		this.load = this.load.bind(this);

		this.load();
	}

	load() {
		//attatch update handlers to components
		Object.keys(this.components).forEach(component => {
			this.components[component].addUpdateHandler(this.update);
		});

		//select first  colour
		this.components.colourList.setSelected(0);

		//attatch event handlers to modals
		this.refs.quantityModal.btnAccept.onclick = () => {
			$("#modal").modal("hide");
			this.refs.btnAddToCart.innerText = "Checkout now";
		};
		this.refs.quantityModal.btnCancel.onclick = () => {
			$("#modal").modal("hide");
			this.refs.btnAddToCart.innerText = "Add to Cart";
			//reset quantity
			this.components.quantityControls.reset();
		};
	}

	update() {
		//render colourList
		this.refs.colourList.innerHTML = "";
		this.refs.colourList.appendChild(this.components.colourList.render());

		//render selectedColour names
		this.refs.selectedColourNames.forEach(
			el => (el.innerText = this.components.colourList.getSelected().name)
		);

		//render quantity controls
		this.refs.quantityControl.innerHTML = "";
		this.refs.quantityControl.appendChild(
			this.components.quantityControls.render()
		);

		//update selected quantities
		const count = this.components.quantityControls.count;
		this.refs.productCount.innerText = count;

		//render selectedColour count times
		this.refs.details.innerHTML = "";
		const selected = this.components.colourList.getSelected();
		selected.selected = false;
		this.refs.details.appendChild(
			new ColourList(new Array(count).fill(selected.name)).render()
		);
	}
}
