import { registerAs } from '@nestjs/config';
export default registerAs('dbConfig', () => ({
  dbURL:
    'mongodb+srv://sangit:sangit@cluster0.oxhrf.mongodb.net/productNest?retryWrites=true&w=majority',
  testURL:
    'mongodb+srv://sangit:sangit@cluster0.oxhrf.mongodb.net/testProduct?retryWrites=true&w=majority',
}));
