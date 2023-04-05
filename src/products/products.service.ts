import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';                                
import ProductsSeed from '../../seed';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async onModuleInit() {
    try {
      const products = await this.productModel.find();
      if (products.length === 0) await this.productModel.create(ProductsSeed);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.find(createProductDto);
    if (product.length > 0) throw new NotFoundException('product already exists');
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.find();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.productModel.updateOne({ _id: id }, updateProductDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.productModel.deleteOne({ _id: id });
  }
}
