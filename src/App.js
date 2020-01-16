import ColourList, { getRandomColours } from "./components/ColourList";
import QuantityControls from "./components/QuantityControls";
import colourNames from "./colors";
import $ from "jquery";

export default class App {
	constructor(renderTargets) {
		this.renderTargets = renderTargets;

		//create components
		this.colourList = new ColourList(getRandomColours(18, colourNames));
		this.quantityControls = new QuantityControls();

		this.update = this.update.bind(this);
		this.load = this.load.bind(this);

		this.load();
	}

	load() {
		//attatch update handlers to components
		this.colourList.addUpdateHandler(this.update);
		this.quantityControls.addUpdateHandler(this.update);

		//select first  colour
		this.colourList.setSelected(0);

		//attatch event handlers to modals
		this.renderTargets.quantityModal.btnAccept.onclick = () => {
			$("#modal").modal("hide");
		};
		this.renderTargets.quantityModal.btnCancel.onclick = () => {
			$("#modal").modal("hide");
			//reset quantity
			this.quantityControls.reset();
		};
	}

	update() {
		//render colourList
		this.renderTargets.colourList.innerHTML = "";
		this.renderTargets.colourList.appendChild(this.colourList.render());

		//render selectedColour names
		this.renderTargets.selectedColourNames.forEach(
			el => (el.innerText = this.colourList.getSelected().name)
		);

		//render quantity controls
		this.renderTargets.quantityControl.innerHTML = "";
		this.renderTargets.quantityControl.appendChild(
			this.quantityControls.render()
		);

		//update selected quantities
		const count = this.quantityControls.count;
		this.renderTargets.productCount.innerText = count;

		//render selectedColour count times
		this.renderTargets.details.innerHTML = "";
		const selected = this.colourList.getSelected();
		selected.selected = false;
		this.renderTargets.details.appendChild(
			new ColourList(new Array(count).fill(selected.name)).render()
		);
	}
}
