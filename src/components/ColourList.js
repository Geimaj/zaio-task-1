import Component from "../Component";
import Colour from "./Colour";

export default class ColourList extends Component {
	constructor(colourNames) {
		super();
		this.colourNames = colourNames;

		this.state = {
			selectedColourIndex: null
		};
	}

	getSelected() {
		return new Colour(
			this.colourNames[this.state.selectedColourIndex]
		).select();
	}

	setSelected(index) {
		if (index >= 0 && index <= this.colourNames.length) {
			this.setState({
				selectedColourIndex: index
			});
		}
	}

	colourClicked(i) {
		this.setSelected(i);
	}

	render() {
		const colourObjects = this.colourNames.map((colour, i) => {
			const c = new Colour(colour);
			c.onclick = () => this.colourClicked(i);
			return c;
		});
		//add border to selected
		if (this.state.selectedColourIndex !== null) {
			colourObjects[this.state.selectedColourIndex].select();
		}
		const colourElements = colourObjects.map(el => el.render());
		const list = document.createElement("ul");
		list.append(...colourElements);
		return list;
	}
}

export function getRandomColours(n = 18, colourNames) {
	let randomColours = [];

	while (randomColours.length <= n) {
		const random = Math.floor(Math.random() * colourNames.length);
		if (!randomColours.includes(colourNames[random])) {
			randomColours.push(colourNames[random]);
		}
	}
	return randomColours;
}
