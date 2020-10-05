import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ProductProvider } from './product/product.provider';
import { ProductsService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigModule } from './config/database/config.module';
import { DatabaseConfigService } from './config/database/config.service';

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   'mongodb+srv://sangit:sangit@cluster0.oxhrf.mongodb.net/productNest?retryWrites=true&w=majority',
    // ),
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (config: DatabaseConfigService) => ({
        uri: config.dbURL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [DatabaseConfigService],
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
