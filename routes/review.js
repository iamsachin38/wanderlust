const express = require("express");
const router = express.Router({mergeParams:true});
const warpAsync = require("../utils/warpAsync.js");
const Review =  require("../models/reviews.js");
const Listing =  require("../models/listing.js");
const{validateReview, isLoggedId,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")


// Post Review Route --->
router.post("/",isLoggedId, validateReview,warpAsync(reviewController.createReview));
   
   // Delete Review Route --->
   router.delete("/:reviewId",isLoggedId,isReviewAuthor,warpAsync(reviewController.destroyReview));
   
   module.exports = router;