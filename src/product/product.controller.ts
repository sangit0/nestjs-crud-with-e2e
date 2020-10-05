import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductDto } from './product';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ProductProvider } from './product.provider';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  private productProvider: ProductProvider; // like here

  constructor(productProvider: ProductProvider) {
    this.productProvider = productProvider;
  }

  @Post()
  @ApiBody({ type: ProductDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ProductDto,
  })
  async addProduct(@Body() product: ProductDto) {
    const generatedId = await this.productProvider.insert(
      product.title,
      product.description,
      product.price,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productProvider.getEntities();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productProvider.getEntity(prodId);
  }

  @Patch(':id')
  @ApiBody({ type: ProductDto })
  async updateProduct(
    @Param('id') prodId: string,
    @Body() product: ProductDto,
  ) {
    let result = await this.productProvider.updateEntity(
      prodId,
      product.title,
      product.description,
      product.price,
    );
    return result;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productProvider.deleteEntity(prodId);
    return null;
  }
}
