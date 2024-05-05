const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing =  require("../models/listing.js");
const{isLoggedId, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const{storage} = require("../cloudConfig.js")
const upload = multer({storage })

router
.route("/")
.get(warpAsync(listingController.index))
.post(isLoggedId,upload.single("listing[image]"), warpAsync(listingController.createListing))

// New Route---->
router.get("/new",isLoggedId ,listingController.renderNewForm);

router
.route("/:id")
.get( warpAsync(listingController.showListing))
.put(isLoggedId,isOwner,upload.single("listing[image]"),warpAsync(listingController.updateListing))
.delete(isLoggedId,isOwner,warpAsync(listingController.destroyListing))

// Edit Route ---->
router.get("/:id/edit",isLoggedId,isOwner ,warpAsync(listingController.renderEditForm));


module.exports = router;

