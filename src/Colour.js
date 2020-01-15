export default class Colour {
    constructor(name) {
        this.name = name;
        this.selected = false;
    }

    render() {
        const li = document.createElement("li")
        const div = document.createElement("div")
        div.className = "colour"
        div.style.backgroundColor = this.name;
        div.onclick = () => this.onclick()

        if (this.selected) {
            li.classList.add("selected")
        }

        li.appendChild(div)
        return li;
    }

    onclick() {
        console.log('click! ' + this.name)
    }

}