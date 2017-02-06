module.exports = exports = function(res, errror) {
    res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos. **' + errror});
};