import { Document, Schema } from 'mongoose';

/**
 * Interface representing an experience record.
 * @interface
 * @extends Document
 */
export interface Experience extends Document {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

/**
 * Interface representing a Mongoose document for experience.
 * @interface
 * @extends Experience
 * @extends Document
 */
export interface ExperienceDocument extends Experience, Document {}

/**
 * Mongoose schema for the Experience model.
 * @type {Schema}
 */

export const ExperienceSchema = new Schema<Experience>({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

export default Experience;
