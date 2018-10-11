// const mongoose = require('mongoose');
const UserService = require('../../users/services/userService');

describe('User services', () => {
  describe('getCartItems service..', () => {
    it('to be called', async () => {
      const Model = {
        findOne: jest.fn().mockReturnValue(Promise.resolve({ name: 'bonner' })),
      };
      const userService = new UserService(Model);
      const result = await userService.getCartItems();
      expect(Model.findOne).toBeCalled();
      expect(result).toHaveProperty('name');
    });
  });
  describe('addItemToCart service..', () => {
    it('to be called with 2 args and return boolean', async () => {
      const Model = {
        update: jest.fn().mockReturnValue(Promise.resolve({ ok: 1 })),
      };
      const userService = new UserService(Model);
      const result = await userService.addItemToCart('body', 'userId');
      expect(Model.update).toBeCalled();
      expect(Model.update).toBeCalledWith(
        { _id: 'userId' },
        { $push: { cart: 'body' } }
      );
      expect(result).toBeTruthy();
    });
  });
});
