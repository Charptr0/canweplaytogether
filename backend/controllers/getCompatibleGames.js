const axios = require("axios");
require("dotenv").config();

const STEAM_APP_URL = "https://store.steampowered.com/api/appdetails/"

const VALID_IDS = {
    1: "Multi-player",
    9: "Co-op",
    24: "Shared/Split Screen",
    27: "Cross-Platform Multiplayer",
    36: "Online PvP",
    37: "Shared/Split Screen PvP",
    38: "Online Co-op",
    39: "Shared/Split Screen Co-op",
    48: "LAN Co-op",
    49: "PvP",
    47: "LAN PvP",
};

module.exports = async (req, res) => {
    const commonGames = req.body.commonGames || [];

    if (commonGames.length === 0) return res.json({ status: 200, compatibleGames: [] });

    const compatibleGames = [];

    for (const id of commonGames) {
        try {
            const steamRes = await axios.get(STEAM_APP_URL + `?appids=${id}`);
            const payload = steamRes.data[id]?.data;

            const categories = payload.categories;
            const valid_categories = [];

            for (const category of categories) {
                if (VALID_IDS[category.id]) {
                    valid_categories.push(category.id);
                }
            }

            if (valid_categories.length === 0) continue;

            compatibleGames.push({
                game_name: payload.name,
                img: payload.header_image,
                url: `https://store.steampowered.com/app/${id}/`,
                categories: valid_categories
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: 500, errorMessage: "An error has occurred when connecting to Steam services" });
        }
    }

    return res.json({ status: 200, compatibleGames });
}