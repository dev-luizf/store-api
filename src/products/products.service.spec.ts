import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import ProductSeed from '../seed';
import { Product } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

const productList = [
  {
    _id: '63fc13c7b817f1ef5af52631',
    ...ProductSeed[0],
  },
  {
    _id: '63fc13c7b817f1ef5af52632',
    ...ProductSeed[1],
  },
];
const notFoundError = 'product not found';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'PRODUCT_MODEL',
          useValue: {
            create: jest.fn().mockResolvedValue(productList[0]),
            find: jest.fn().mockResolvedValue(productList),
            findOne: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(productList[0]),
            updateOne: jest.fn().mockResolvedValue(null),
            deleteOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    model = module.get<Model<Product>>('PRODUCT_MODEL');
    service = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('deve criar um novo produto', async () => {
      const newProduct = await service.create(productList[0]);
      expect(newProduct._id).toEqual(productList[0]._id);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de produtos', async () => {
      const list = await service.findAll();
      expect(list).toEqual(productList);
    });
  });

  describe('findOne', () => {
    it('deve retornar um produto específico', async () => {
      const product = await service.findOne(productList[0]._id);
      expect(product).toEqual(productList[0]);
    });

    it('deve lançar um erro se o produto não for encontrado', async () => {
      jest.spyOn(model, 'findById').mockReturnValue(null);
      try {
        await service.findOne(productList[0]._id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toEqual(notFoundError);
      }
    });
  });

  describe('update', () => {
    const product = productList[0];

    it('deve atualizar um produto', async () => {
      await expect(
        service.update(product._id, { name: 'novo nome' }),
      ).resolves.not.toThrow();
    });

    it('deve lançar um erro se o produto não for encontrado', async () => {
      jest.spyOn(model, 'findById').mockReturnValue(null);
      try {
        await service.update(product._id, product);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toEqual(notFoundError);
      }
    });
  });

  describe('remove', () => {
    it('deve remover um produto', async () => {
      await expect(service.remove(productList[0]._id)).resolves.not.toThrow();
    });

    it('deve lançar um erro se o produto não for encontrado', async () => {
      jest.spyOn(model, 'findById').mockReturnValue(null);
      try {
        await service.remove(productList[0]._id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toEqual(notFoundError);
      }
    });
  });
});
