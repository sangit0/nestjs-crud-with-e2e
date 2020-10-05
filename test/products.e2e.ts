import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductDto } from '../src/product/product';
import * as mongoose from 'mongoose';

describe('E2E Tests for PRODUCT Endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async done => {
    await mongoose.disconnect(done);
  });

  it('should create a product', () => {
    const product: ProductDto = {
      title: 'Test Product',
      description: 'Test Product Description',
      price: 0,
    };
    return request(app.getHttpServer())
      .post('/products')
      .set('Accept', 'application/json')
      .send(product)
      .expect(HttpStatus.CREATED);
  });
  it('should update a product', () => {
    const product: ProductDto = {
      title: 'Test Updated Product',
      description: 'Test Product Updated Description',
      price: 1,
    };
    return request(app.getHttpServer())
      .patch('/products/5f79a25dcad0e3273810f018')
      .set('Accept', 'application/json')
      .send(product)
      .expect(HttpStatus.OK);
  });
  it('should get all product', () => {
    return request(app.getHttpServer())
      .get('/products')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
  it('should get a product', () => {
    return request(app.getHttpServer())
      .get('/products/5f79a25dcad0e3273810f018')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
  it('should delete a product', () => {
    return request(app.getHttpServer())
      .delete('/products/5f79a25dcad0e3273810f018')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
});
