const express = require('express');
require("dotenv").config();

const controllers = require("./controllers");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send({ status: "OK" }));

app.get("/get-profile/:id", controllers.getProfileById);

app.get("/get-coop-games", (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});