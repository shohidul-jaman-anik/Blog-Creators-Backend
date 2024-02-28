const express = require('express');
const router = express.Router();
const wishlistRoute = require('./addToWishlist.controller');
// const { validateRequest } = require("../../middlewares/validateRequest/validateRequest");
// const { addToWishlistValidationSchema } = require("./addToWishlist.Validation")

router.route('/deleteWishlist/:productId').delete(wishlistRoute.removeWishlist);
router.route('/getWishlist/:authorId').get(wishlistRoute.wishlistedById);
router.route('/addWishlist').post(wishlistRoute.addToWishlist);

module.exports = router;
