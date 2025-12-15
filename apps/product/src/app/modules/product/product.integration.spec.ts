import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@common/entities/product.entity';
import { ProductService } from './services/product.service';
import { CreateProductTcpRequest } from '@common/interfaces/tcp/product';
import { HttpStatus } from '@nestjs/common';

describe('Product Integration', () => {
  let controller: ProductController;
  let repository: ProductRepository;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer('postgres:16-alpine').start();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: postgresContainer.getHost(),
          port: postgresContainer.getPort(),
          username: postgresContainer.getUsername(),
          password: postgresContainer.getPassword(),
          database: postgresContainer.getDatabase(),
          entities: [Product],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      controllers: [ProductController],
      providers: [ProductRepository, ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    repository = module.get<ProductRepository>(ProductRepository);
  }, 60000); // timeout for container startup

  afterAll(async () => {
    await postgresContainer.stop();
  });

  afterEach(async () => {
    const allProducts = await repository.findAll();
    for (const product of allProducts) {
      await repository.remove(product.id);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createDto: CreateProductTcpRequest = {
      name: 'Test Product',
      sku: 'TEST-SKU',
      description: 'Test Description',
      price: 100,
      unit: 'pcs',
      vatRate: 10,
    };

    const response = await controller.create(createDto);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.data).toBeDefined();
    expect(response.data?.name).toBe(createDto.name);
    expect(response.data?.sku).toBe(createDto.sku);

    // Check DB
    if (response.data?.id) {
      const savedProduct = await repository.findById(response.data.id);
      expect(savedProduct).toBeDefined();
      expect(savedProduct?.name).toBe(createDto.name);
    }
  });

  it('should get list of products', async () => {
    await repository.create({
      name: 'Product 1',
      sku: 'SKU-1',
      price: 10,
      unit: 'pcs',
      vatRate: 10,
    });
    await repository.create({
      name: 'Product 2',
      sku: 'SKU-2',
      price: 20,
      unit: 'box',
      vatRate: 8,
    });

    const response = await controller.getList();

    console.log('response', response);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.statusCode).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data).toHaveLength(2);
    expect(response.data?.find((p) => p.sku === 'SKU-1')).toBeDefined();
    expect(response.data?.find((p) => p.sku === 'SKU-2')).toBeDefined();
  });
});
