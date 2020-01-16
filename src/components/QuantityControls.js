import Component from "../Component";
export default class QuantityControls extends Component {
	constructor() {
		super();

		this.state = {
			count: 0
		};

		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	get count() {
		return this.state.count;
	}

	reset() {
		this.setState({
			count: 0
		});
	}

	increment() {
		this.setState({
			count: this.state.count + 1
		});
	}

	decrement() {
		if (this.state.count > 0) {
			this.setState({
				count: this.state.count - 1
			});
		}
	}

	render() {
		const div = document.createElement("div");
		const inc = document.createElement("button");
		inc.innerText = " + ";
		const span = document.createElement("span");
		span.innerText = this.state.count;
		const dec = document.createElement("button");
		dec.innerText = " - ";

		dec.disabled = this.state.count <= 0;

		inc.onclick = this.increment;
		dec.onclick = this.decrement;

		div.appendChild(dec);
		div.appendChild(span);
		div.appendChild(inc);

		return div;
	}
}
