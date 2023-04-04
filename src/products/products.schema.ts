import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  thumbnail: String,
  description: String,
});
