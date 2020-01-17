const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;
const distDir = `${__dirname}/dist/`;
const app = express();
app.use(express.static(distDir));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(distDir, "index.html"));
});

app.listen(port);
console.log("started server on port " + port);
