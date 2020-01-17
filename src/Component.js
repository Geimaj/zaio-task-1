export default class Component {
	constructor() {
		this.state = {};
		this.onUpdateHandlers = [];
	}

	setState(state) {
		this.state = { ...this.state, ...state };
		this.onUpdateHandlers.forEach(f => {
			f();
		});
	}

	addUpdateHandler(f) {
		this.onUpdateHandlers.push(f);
	}

	render() {}
}
