import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly price: string;
  readonly category: string;
  readonly thumbnail: string;
  readonly description: string;
}
