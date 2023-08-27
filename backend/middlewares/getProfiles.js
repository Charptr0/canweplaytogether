const axios = require("axios");
require("dotenv").config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_PROFILE_API_URL = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/"

module.exports = async (req, res, next) => {
    const userIds = req.body.ids;

    const users = [];

    for (const userId of userIds) {
        try {
            const steamRes = await axios.get(STEAM_PROFILE_API_URL + `?key=${STEAM_API_KEY}&steamids=${userId}`);
            const payload = steamRes.data?.response;

            const user = payload.players[0] || null;

            if (!user) return res.status(404).json({ status: 404, errorMessage: `Cannot find user with the id ${userId}` });

            users.push(user);
            continue;

        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: 500, errorMessage: "An error has occurred when connecting to Steam services" });
        }
    }

    req.body.users = users;
    next();
}