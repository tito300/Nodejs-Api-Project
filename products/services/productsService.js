// exports a class that will instantiate a service the contains methods
module.exports = class productsService {
  constructor(Product) {
    this.Product = Product;
    this.getOneByName = this.getOneByName.bind(this);
    this.getByCategory = this.getByCategory.bind(this);
  }

  async getOneByName(name) {
    return this.Product.findOne({ name }, 'price available -_id');
  }

  async getByCategory(category) {
    const results = await this.Product.find(
      { category },
      'price available -_id'
    );
    if (results.length === 0 || results === undefined) {
      return new Error('not found');
    }
    return results;
  }

  async getAllProducts() {
    return this.Product.find({});
  }
};
