const UserModel = require('../auth/auth.model');

exports.getWishlistServiceById = async authorId => {
  const wishlist = await UserModel.findById({ authorId }).populate('wishlist');
  console.log(wishlist, 'wishlist');
  return wishlist;
};

exports.addToWishlistService = async (userId, propertyId) => {
  try {
    console.log(propertyId, 'propertyId');
    const user = await UserModel.findById(userId);

    const alreadyAdded = user.wishlist.includes(propertyId);
    if (alreadyAdded) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: propertyId } },
        { new: true },
      );
      const message = 'Wishlist Remove successfully';
      const result = { updatedUser, message };
      return result;
    } else {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { wishlist: propertyId } },
        { new: true },
      );
      const message = 'Wishlist Add successfully';
      const result = { updatedUser, message };
      return result;
    }
  } catch (error) {
    throw new Error(`Failed to update wishlist: ${error.message}`);
  }
};

exports.removeWishlistService = async (userId, productId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.wishlist = user.wishlist.filter(item => item.toString() !== productId);

    await user.save();

    return user;
  } catch (error) {
    throw new Error(`Failed to update wishlist: ${error.message}`);
  }
};
