const axios = require("axios");
require("dotenv").config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_PROFILE_GAMES_API_URL = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"

module.exports = async (req, res, next) => {
    const users = req.body?.users || [];

    if (!users) return res.status(500).send({ status: 500, errorMessage: "Something went wrong with parsing the users, please try again later" });

    let intersect = new Set();

    // get their list of games from each user
    for (const user of users) {
        try {
            const steamRes = await axios.get(STEAM_PROFILE_GAMES_API_URL + `?key=${STEAM_API_KEY}&steamid=${user.steamid}&include_appinfo=1`);
            const payload = steamRes.data.response;

            // find the intersection between the current game and the previous common game set
            const games = new Set();
            payload.games.forEach((game) => games.add(game.appid));
            if (intersect.size === 0) intersect = new Set([...games]);
            else intersect = new Set([...intersect].filter(id => games.has(id)));
        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: 500, errorMessage: "An error has occurred when connecting to Steam services" });
        }
    }

    req.body.commonGames = [...intersect];
    next();
}