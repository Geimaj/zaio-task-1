export default class QuantityControls {
	constructor(count, increment, decrement) {
		this.count = count;
		this.increment = increment;
		this.decrement = decrement;
	}

	render() {
		const div = document.createElement("div");
		const inc = document.createElement("button");
		inc.innerText = " + ";
		const span = document.createElement("span");
		span.innerText = this.count;
		const dec = document.createElement("button");
		dec.innerText = " - ";

		dec.disabled = this.count <= 0;

		inc.onclick = this.increment;
		dec.onclick = this.decrement;

		div.appendChild(dec);
		div.appendChild(span);
		div.appendChild(inc);

		return div;
	}
}
