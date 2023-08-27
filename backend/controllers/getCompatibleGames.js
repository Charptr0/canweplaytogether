module.exports = async (req, res) => {
    const commonGames = req.body.commonGames;
    const option = req.body.option;

    return res.json({ commonGames, option });
}