import "bootstrap";
import "./styles/index.scss";
import "@fortawesome/fontawesome-free/js/all.js";
import App from "./App";

import renderTargets from "./render-targets";

const app = new App(renderTargets);
app.update();
