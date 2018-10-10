const Service = require('../../products/services/productsService');

let Model;
describe('product services tests', () => {
  describe('productsService should be available', () => {
    expect(Service).toBeDefined();
  });
  describe('getOneByName method', () => {
    beforeAll(() => {
      Model = {
        find: jest.fn(),
        findOne: jest
          .fn()
          .mockReturnValue(Promise.resolve({ price: '18', available: true })),
      };
    });
    it('should be called once', () => {
      const service = new Service(Model);
      service.getOneByName('bonner');
      expect(Model.findOne).toHaveBeenCalledTimes(1);
    });
    it('should be called with bonner', () => {
      const service = new Service(Model);
      service.getOneByName('bonner');
      expect(Model.findOne).toHaveBeenCalledWith({ 'name': 'bonner' }, "price available -_id"); // eslint-disable-line
    });
    it('should return object with 2 properties', async () => {
      const service = new Service(Model);
      const result = await service.getOneByName('bonner');
      expect(result).toHaveProperty('price');
    });
  });
});
