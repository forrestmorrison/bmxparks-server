const express = require("express")
const parksRouter = express.Router()
const parksController = require("../controllers/parks")

router.getParks("/", parksController.listParks)

module.exports = parksRouter