const httpStatus = require('http-status');
const {
  getWishlistServiceById,
  removeWishlistService,
  addToWishlistService,
} = require('./addToWishlist.service');
const { catchAsync } = require('../../../shared/catchAsync');
const { sendResponse } = require('../../../shared/sendResponse');

module.exports.wishlistedById = catchAsync(async (req, res) => {
  const { authorId } = req.params;
  console.log(authorId, 'authorId authorId');
  const result = await getWishlistServiceById(authorId);
  console.log(result, 'resulttttttt');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Wishlist Successfully',
    data: result.wishlist,
  });
});

exports.addToWishlist = catchAsync(async (req, res) => {
  const { author, blogId } = req.body;
  console.log(author, blogId, 'userId, blogId ');
  const result = await addToWishlistService(author, blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.message,
    data: result?.updatedUser,
  });
});

exports.removeWishlist = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const { author } = req.body;
  const result = await removeWishlistService(author, productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product removed from wishlist',
    data: result,
  });
});
