const express = require("express")
const parksRouter = express.Router()
const parksController = require("../controllers/parks")

router.getParks("./parks", parksController.listParks)

module.exports = parksRouter