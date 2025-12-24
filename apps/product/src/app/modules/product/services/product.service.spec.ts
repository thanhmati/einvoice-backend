import { ProductService } from './product.service';
import { ProductRepository } from '../repositories/product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductTcpRequest } from '@common/interfaces/tcp/product';
import { BadRequestException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  const mockProductRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateProductTcpRequest = {
      sku: 'SKU-001',
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      unit: 'pcs',
      vatRate: 10,
    };

    it('should create a product successfully when it does not exist', async () => {
      mockProductRepository.exists.mockResolvedValue(false);
      mockProductRepository.create.mockResolvedValue({
        id: 1,
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(createDto);

      expect(repository.exists).toHaveBeenCalledWith(createDto.sku, createDto.name);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        id: 1,
        ...createDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should throw BadRequestException when product already exists', async () => {
      mockProductRepository.exists.mockResolvedValue(true);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(repository.exists).toHaveBeenCalledWith(createDto.sku, createDto.name);
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('getList', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        {
          id: 1,
          sku: 'SKU-1',
          name: 'P1',
          price: 100,
          unit: 'pcs',
          vatRate: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          sku: 'SKU-2',
          name: 'P2',
          price: 200,
          unit: 'box',
          vatRate: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockProductRepository.findAll.mockResolvedValue(mockProducts);

      const result = await service.getList();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });
});
