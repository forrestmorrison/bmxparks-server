const express = require("express")
const router = express.Router()
const parksController = require("../controllers/parks")

router.get("/", parksController.getAllParks)

router.post("/", parksController.createPark)

module.exports = router