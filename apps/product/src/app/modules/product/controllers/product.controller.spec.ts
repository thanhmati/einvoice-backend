import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { CreateProductTcpRequest, ProductTcpResponse } from '@common/interfaces/tcp/product';
import { Response } from '@common/interfaces/tcp/common/response.interface';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    create: jest.fn(),
    getList: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product and return successful response', async () => {
      const dto: CreateProductTcpRequest = {
        sku: 'SKU-TEST',
        name: 'Test Product',
        description: 'Desc',
        price: 50,
        unit: 'pcs',
        vatRate: 10,
      };

      const expectedProduct: ProductTcpResponse = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockProductService.create.mockResolvedValue(expectedProduct);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(Response.success(expectedProduct));
    });
  });

  describe('getList', () => {
    it('should return list of products wrapped in Response', async () => {
      const products: ProductTcpResponse[] = [
        {
          id: 1,
          sku: 'S1',
          name: 'N1',
          description: 'D1',
          price: 10,
          unit: 'pcs',
          vatRate: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockProductService.getList.mockResolvedValue(products);

      const result = await controller.getList();

      expect(service.getList).toHaveBeenCalled();
      expect(result).toEqual(Response.success(products));
    });
  });
});
