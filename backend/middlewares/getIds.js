const axios = require("axios");
const url = require("url");
require("dotenv").config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_VANITY_URL = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/";

module.exports = async (req, res, next) => {
    const steamCommunityUrls = req.query?.urls.split(" ") || [];
    const option = req.query.option;

    if (!steamCommunityUrls) return res.status(400).json({ status: 400, errorMessage: "URL cannot be empty" });

    const ids = [];

    for (const rawUrl of steamCommunityUrls) {
        let parsedUrl = "";

        try {
            parsedUrl = new url.URL(rawUrl);
        } catch (err) {
            return res.status(400).json({ status: 400, errorMessage: `${rawUrl} is not a valid url` });
        }

        if (parsedUrl.hostname !== "steamcommunity.com") {
            return res.status(400).json({ status: 400, errorMessage: `The url ${rawUrl} is not a steam profile` });
        }

        const pathNames = parsedUrl.pathname.split("/").filter(path => path !== "");
        if (pathNames.length < 2) return res.status(400).json({ status: 400, errorMessage: `Cannot find the id of ${rawUrl}` });

        // id is given in the url
        if (pathNames[0] === "profiles") {
            ids.push(pathNames[1]);
            continue;
        }

        // manually find the id
        else if (pathNames[0] === "id") {
            try {
                const steamRes = await axios.get(STEAM_VANITY_URL + `?key=${STEAM_API_KEY}&vanityurl=${pathNames[1]}`);
                const payload = steamRes.data?.response;

                if (!payload) return res.status(404).json({ status: 404, errorMessage: `Cannot find user using this url ${rawUrl}` })

                ids.push(payload.steamid);
                continue;

            } catch (err) {
                console.error(err);
                return res.status(500).json({ status: 500, errorMessage: "An error has occurred when connecting to Steam services" });
            }
        }

        else return res.status(400).json({ status: 400, errorMessage: `Cannot find the user ${rawUrl}` });
    }

    req.body.ids = ids;

    option ? req.body.option = option : req.body.option = "all";
    next();
}