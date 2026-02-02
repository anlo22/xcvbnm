import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
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
      required: [true, 'Image is required'],
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

const modelName = 'Product';

if (mongoose.models[modelName]?.schema?.path('category')) {
  delete mongoose.models[modelName];
}

const Product: Model<IProduct> =
  mongoose.models[modelName] || mongoose.model<IProduct>(modelName, ProductSchema);

export default Product;

