const express = require("express")
const router = express.Router()
const parksController = require("../controllers/parks")

router.get("/", parksController.getAllParks)

router.get("/:id", parksController.showPark)

router.post("/", parksController.createPark)

router.delete("/:id", parksController.deleteParkById)

module.exports = router