const express = require("express")
const router = express.Router()
const reviewsController = require("../controllers/reviews")

router.get("/", reviewsController.getAllReviews)

router.get("/:id", reviewsController.showReview)

router.post("/", reviewsController.createReview)

router.delete("/:id", reviewsController.deleteReviewById)

module.exports = router