import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { joiValidate } from 'src/utils/joiValidate';
import { createProductSchema, updateProductSchema } from 'src/joi-schemas/product.joischema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  validateId(id: string) {
    if (!id) throw new BadRequestException('id is required');
    if (id.length !== 24) throw new BadRequestException('id is invalid');
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    joiValidate(createProductSchema, createProductDto)
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateId(id);
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    this.validateId(id);
    joiValidate(updateProductSchema, updateProductDto)
    await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.validateId(id);
    await this.productsService.remove(id);
  }
}
