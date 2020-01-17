import Component from "../Component";

export default class Colour extends Component {
	constructor(name) {
		super();
		this.name = name;
		this.selected = false;
	}

	select() {
		this.selected = true;
		return this;
	}

	render() {
		const li = document.createElement("li");
		const div = document.createElement("div");
		div.className = "colour";
		div.style.backgroundColor = this.name;
		//this.onclick will be overwritter by whoever calls it
		div.onclick = () => this.onclick();

		if (this.selected) {
			li.classList.add("selected");
		}

		li.appendChild(div);
		return li;
	}

	onclick() {
		console.log("click! " + this.name);
	}
}
