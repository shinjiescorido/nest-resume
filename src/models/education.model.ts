import { Document, Schema } from 'mongoose';

/**
 * Interface representing an education record.
 */
export interface Education extends Document {
  school: string;
  course: string;
  date: Date;
}

/**
 * Interface representing a Mongoose document for education.
 */
export interface EducationDocument extends Education, Document {}

/**
 * Mongoose schema for the Education model.
 */
export const EducationSchema = new Schema<Education>({
  school: String,
  course: String,
  date: Date,
});

export default Education;
