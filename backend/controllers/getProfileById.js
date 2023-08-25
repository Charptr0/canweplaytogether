module.exports = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    return res.send({ status: "OK" });
}