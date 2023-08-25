module.exports = async (req, res) => {
    const id = req.query?.id;

    if (!id) return res.status(400).json({ status: 400, errorMessage: "ID cannot be empty" });

    return res.json({ status: "OK" });
}