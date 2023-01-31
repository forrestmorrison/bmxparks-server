const parks = require("../data/parks")

const listParks = (req, res) => {
    res.json(parks)
}

const showPark = () => {

}

const createPark = () => {

}

const deletePark = () => {

}

module.exports = {
    listParks,
    showPark,
    createPark,
    deletePark
}