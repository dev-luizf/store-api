import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  thumbnail: String,
  description: String,
});
