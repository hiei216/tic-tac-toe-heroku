const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let DUMMY_State = [];

app.get("/getCurrentState", (req, res, next) => {
  res.status(200).json({ state: DUMMY_State });
});

app.post("/updateState", (req, res, next) => {
  const createGameState = req.body;
  DUMMY_State.push(createGameState);
  res.status(201).json({ message: "Created new gameState." });
});

app.delete("/deleteState", (req, res, next) => {
  DUMMY_State.splice(0, DUMMY_State.length);
});

app.listen(port, () => console.log(`Listening on port ${port}`));