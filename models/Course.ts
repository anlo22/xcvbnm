import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
  duration: string;
  lessons: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    titleEn: {
      type: String,
      required: [true, 'English title is required'],
      trim: true,
    },
    titleAr: {
      type: String,
      required: [true, 'Arabic title is required'],
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
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    lessons: {
      type: Number,
      required: [true, 'Number of lessons is required'],
      min: [1, 'Must have at least 1 lesson'],
    },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;

