import { Product } from './product';
import { SetMetadata } from '@nestjs/common';

export abstract class ProductProvider {
  abstract getEntities(): Promise<Product[]>;
  abstract insert(title: string, desc: string, price: number): Promise<String>;
  abstract getEntity(productId: string): Promise<Product>;
  abstract updateEntity(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<String>;
  abstract deleteEntity(prodId: string): Promise<String>;
}
