import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductModelName } from '@common/schemas/product.schema';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getModelToken(ProductModelName),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    model = module.get<Model<Product>>(getModelToken(ProductModelName));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = { sku: 'sku', name: 'name' };
      (model.create as jest.Mock).mockResolvedValue(productData);
      const createdProduct = await repository.create(productData);
      expect(createdProduct).toEqual(productData);
    });
  });

  describe('exists', () => {
    it('should return true if product exists', async () => {
      const mockResult = { _id: '123' }; // giả lập result truthy
      (model.exists as jest.Mock).mockResolvedValue(mockResult);

      const exists = await repository.exists('sku', 'name');
      expect(exists).toBe(true);
    });

    it('should return false if product does not exist', async () => {
      (model.exists as jest.Mock).mockResolvedValue(null); // giả lập result falsy

      const exists = await repository.exists('sku', 'name');
      expect(exists).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [
        { sku: 'sku1', name: 'name1' },
        { sku: 'sku2', name: 'name2' },
      ];
      (model.find as jest.Mock).mockResolvedValue(products);
      const foundProducts = await repository.findAll();
      expect(foundProducts).toEqual(products);
    });
  });

  describe('findById', () => {
    it('should return product by id', async () => {
      const productData = { sku: 'sku', name: 'name' };
      (model.findById as jest.Mock).mockResolvedValue(productData);

      const foundProduct = await repository.findById(1);
      expect(foundProduct).toEqual(productData);
    });

    it('should return null if product is not found', async () => {
      (model.findById as jest.Mock).mockResolvedValue(null);

      const foundProduct = await repository.findById(1);
      expect(foundProduct).toBeNull();
    });
  });
});
