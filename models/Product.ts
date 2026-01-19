import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    nameEn: {
      type: String,
      required: [true, 'English name is required'],
      trim: true,
    },
    nameAr: {
      type: String,
      required: [true, 'Arabic name is required'],
      trim: true,
    },
    descriptionEn: {
      type: String,
      required: [true, 'English description is required'],
    },
    descriptionAr: {
      type: String,
      required: [true, 'Arabic description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

