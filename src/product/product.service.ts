import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product';
import { ProductProvider } from './product.provider';

@Injectable()
export class ProductsService implements ProductProvider {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insert(title: string, desc: string, price: number): Promise<String> {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getEntities(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getEntity(productId: string): Promise<Product> {
    const product = await this.findEntity(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateEntity(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<String> {
    await this.productModel.findByIdAndUpdate(productId, {
      title: title,
      description: desc,
      price: price,
    });

    return productId;
  }

  async deleteEntity(prodId: string): Promise<String> {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
    return prodId;
  }

  private async findEntity(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
