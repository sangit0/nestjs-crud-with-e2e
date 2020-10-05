import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductProvider } from './product.provider';

import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';

import { ProductSchema } from './product';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: ProductProvider,
      useClass: ProductsService,
    },
  ],
})
export class ProductModule {}
