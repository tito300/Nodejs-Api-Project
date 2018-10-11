// exports a class that will instantiate a service the contains methods
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

/**
 *
 * @class class representing userService
 *
 */
module.exports = class UserService {
  constructor(User) {
    this.User = User;
    // this.listCart = this.listCart.bind(this);
  }

  async registerUser(info) {
    const name = info.name;
    const email = info.email;
    const password = info.password;
    const phone = info.phone;

    const user = await this.User.findOne({ email }, 'name');
    if (user) return createError(404, `${user.name} is alread signed up`);

    const salt = await bcrypt.genSalt(13);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new this.User({
      name,
      email,
      password: hashed,
      phone,
    });

    const token = await newUser.createJwt();
    if (token === (undefined || null))
      return createError(500, 'token was not generated');
    try {
      await newUser.save();
    } catch (error) {
      return createError(400, error);
    }

    return token;
  }

  async login(body) {
    const email = body.email;
    const password = body.password;

    const user = await this.User.findOne({ email }, 'name password');
    if (!user) return createError(404, `email or password is wrong`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return createError(404, `email or password is wrong`);

    const token = await user.createJwt();
    if (token === (undefined || null))
      return createError(500, 'token was not generated');
    return token;
  }

  /**
   * populates and gets items from cart array
   *
   * @param {Number|String} userId takes user id
   * @returns {Query} returns array of populated cart items
   */
  async getCartItems(userId) {
    const result = await this.User.findOne({ _id: userId })
      .populate('cart.productId')
      .lean(); // returns array instead of mongoosemObject

    return result;
  }

  /**
   * adds a reference (objectId) to the cart array property
   * in user model
   *
   * @param {String} itemId id of the product to add
   * @param {Number|String} userId takes user id
   * @returns {Boolean} returns true if item is added successfully
   */
  async addItemToCart(itemId, userId) {
    const added = await this.User.update(
      { _id: userId },
      { $push: { cart: { product: itemId, count: 1 } } }
    );
    if (added.ok !== 1)
      return createError(500, 'something went wrong in userService');
    return true;
  }
};
