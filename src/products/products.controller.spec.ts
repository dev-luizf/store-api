import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import ProductSeed from '../seed';
import { Product } from './interfaces/product.interface';
import { ObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

const productList = ProductSeed as (Product & { _id: ObjectId })[];
const newProduct = productList[0];
const invalidIdError = 'id is invalid';
const requiredIdError = 'id is required';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('deve retornar uma lista de produtos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(productList);
      expect(await controller.findAll()).toEqual(productList);
    });
  });

  describe('findOne', () => {
    it('deve retornar o produto especificado', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(productList[0]);
      expect(await controller.findOne('63fc13c7b817f1ef5af52631')).toEqual(
        productList[0],
      );
    });

    it('deve retornar um erro se o id não for valido', async () => {
      try {
        await controller.findOne('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(invalidIdError);
      }
    });

    it('deve retornar um erro se o id não for informado', async () => {
      const id = undefined;
      try {
        await controller.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(requiredIdError);
      }
    });
  });

  describe('create', () => {
    it('deve criar um novo produto', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(productList[0]);
      expect(await controller.create(newProduct)).toEqual(productList[0]);
    });

    it('deve retornar um erro se as informações não forem válidas', async () => {
      try {
        await controller.create({} as Product);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.error).toEqual('Bad Request');
      }
    });
  });

  describe('delete', () => {
    it('deve excluir um produto existente', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ deletedCount: 1, acknowledged: true });
      await expect(
        controller.remove('63fc13c7b817f1ef5af52631'),
      ).resolves.not.toThrow();
    });

    it('deve retornar um erro se o id não for valido', async () => {
      try {
        await controller.remove('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(invalidIdError);
      }
    });

    it('deve retornar um erro se o id não for informado', async () => {
      const id = undefined;
      try {
        await controller.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(requiredIdError);
      }
    });
  });
});
