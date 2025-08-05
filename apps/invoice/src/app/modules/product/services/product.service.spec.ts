import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { CreateProductTcpReq } from '@common/interfaces/tcp/product';
import { ERROR_CODE } from '@common/constants/enums/error-code.enum';
import { BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            exists: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if product already exists', async () => {
      const data: CreateProductTcpReq = { sku: 'sku', name: 'name', price: 100, unit: 'kg', vatRate: 10 };
      (repository.exists as jest.Mock).mockResolvedValue(true);

      await expect(service.create(data)).rejects.toThrow(new BadRequestException(ERROR_CODE.PRODUCT_ALREADY_EXISTS));
    });

    it('should create product if it does not exist', async () => {
      const data: CreateProductTcpReq = { sku: 'sku', name: 'name', price: 100, unit: 'kg', vatRate: 10 };
      (repository.exists as jest.Mock).mockResolvedValue(false);
      (repository.create as jest.Mock).mockResolvedValue(data);

      const result = await service.create(data);
      expect(result).toEqual(data);
    });
  });

  describe('getAll', () => {
    it('should return all products', async () => {
      const products = [{ sku: 'sku', name: 'name' }];
      (repository.findAll as jest.Mock).mockResolvedValue(products);

      const result = await service.getAll();
      expect(result).toEqual(products);
    });
  });

  describe('getById', () => {
    it('should return product by id', async () => {
      const id = 'id';
      const product = { sku: 'sku', name: 'name' };
      (repository.findById as jest.Mock).mockResolvedValue(product);

      const result = await service.getById(id);
      expect(result).toEqual(product);
    });
  });
});
