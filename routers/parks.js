const express = require("express")
const parksRouter = express.Router()
const parksController = require("../controllers/parks")

router.get("/", parksController.getAllParks)

router.post("/", parksController.createPark)

module.exports = parksRouter