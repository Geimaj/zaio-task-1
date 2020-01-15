import 'bootstrap';
import './styles/index.scss'
import "@fortawesome/fontawesome-free/js/all.js";
import colours from "./colors"
import ColourManager from "./ColourManager"

import renderTargets from "./render-targets"


const manager = new ColourManager(colours)
manager.render(renderTargets.colours)