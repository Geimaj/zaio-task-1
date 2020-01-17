import "bootstrap";
import "./styles/index.scss";
import "@fortawesome/fontawesome-free/js/all.js";
import App from "./App";

import refs from "./refs";

const app = new App(refs);
app.update();
