import { Mongoose } from 'mongoose';
import { ProductSchema } from './products.schema';

export const productProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Product', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
