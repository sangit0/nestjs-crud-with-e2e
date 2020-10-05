import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './product.service';
import { ProductDto } from './product';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: ProductDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ProductDto,
  })
  async addProduct(@Body() product: ProductDto) {
    const generatedId = await this.productsService.insert(
      product.title,
      product.description,
      product.price,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getEntities();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getEntity(prodId);
  }

  @Patch(':id')
  @ApiBody({ type: ProductDto })
  async updateProduct(
    @Param('id') prodId: string,
    @Body() product: ProductDto,
  ) {
    let result = await this.productsService.updateEntity(
      prodId,
      product.title,
      product.description,
      product.price,
    );
    return result;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteEntity(prodId);
    return null;
  }
}
