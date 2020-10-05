import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { Product } from './product';
import { Model } from 'mongoose';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productService: ProductsService;
  let productModel: Model<Product>;

  beforeEach(() => {
    productService = new ProductsService(productModel);
    productsController = new ProductsController(productService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result: any = ['test'];
      jest
        .spyOn(productService, 'getEntities')
        .mockImplementation(() => result);

      expect(await productsController.getAllProducts()).toBe(result);
    });
  });
});
