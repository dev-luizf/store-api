import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { joiValidate } from 'src/utils/joiValidate';
import {
  createProductSchema,
  updateProductSchema,
} from 'src/joi-schemas/product.joischema';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import ProductsSeed from '../seed';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  validateId(id: string) {
    if (!id) throw new BadRequestException('id is required');
    if (id.length !== 24) throw new BadRequestException('id is invalid');
  }

  @ApiOperation({ description: 'Insere um novo produto no banco de dados.' })
  @ApiCreatedResponse({
    description: 'Produto cadastrado com sucesso.',
    schema: {
      example: {
        _id: '5f9f1b9b9c9d0b1b8c8b9c9d',
        ...ProductsSeed[0],
        __v: 0,
      },
    },
  })
  @ApiBody({
    description: 'Produto a ser cadastrado.',
    type: CreateProductDto,
    examples: {
      'Formato válido': {
        value: ProductsSeed[0],
      },
    },
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    joiValidate(createProductSchema, createProductDto);
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    description: 'Retorna uma lista de produtos.',
  })
  @ApiOkResponse({
    description: 'Lista de produtos.',
    schema: {
      example: [
        {
          _id: '5f9f1b9b9c9d0b1b8c8b9c9d',
          ...ProductsSeed[0],
          __v: 0,
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    description: 'Retornar um produto específico.',
  })
  @ApiParam({
    name: 'id',
    examples: {
      'Formato válido': {
        value: '642d90c6c6949b2ad52dd459',
      },
    },
  })
  @ApiOkResponse({
    description: 'Um produto específico.',
    schema: {
      example: {
        _id: '5f9f1b9b9c9d0b1b8c8b9c9d',
        ...ProductsSeed[0],
        __v: 0,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateId(id);
    return this.productsService.findOne(id);
  }

  @ApiOperation({ description: 'Atualiza um produto.' })
  @ApiParam({
    name: 'id',
    examples: {
      'Formato válido': {
        value: '642d90c6c6949b2ad52dd459',
      },
    },
  })
  @ApiBody({
    description: 'Informação a ser atualizada.',
    examples: {
      'Formato válido': {
        value: { price: 99.99 },
      },
    },
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.validateId(id);
    joiValidate(updateProductSchema, updateProductDto);
    await this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ description: 'Deleta um produto do banco de dados.' })
  @ApiParam({
    name: 'id',
    examples: {
      'Formato válido': {
        value: '642d90c6c6949b2ad52dd459',
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.validateId(id);
    await this.productsService.remove(id);
  }
}
