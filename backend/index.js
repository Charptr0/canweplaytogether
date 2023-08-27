const express = require('express');
require("dotenv").config();

const controllers = require("./controllers");
const middlewares = require("./middlewares");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.get("/", (_, res) => res.send({ status: 200, message: "OK" }));
app.get("/get-games",
    middlewares.getIds,
    middlewares.getProfiles,
    middlewares.filterGames,
    controllers.getMatchingGames);

app.listen(PORT, () => {
    if (!process.env.STEAM_API_KEY) {
        console.error("The steam API key in the .env file cannot be empty.");
        return;
    }

    console.log(`Server listening on ${PORT}`);
});