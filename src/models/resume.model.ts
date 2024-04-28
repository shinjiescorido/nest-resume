import { Document, Schema, Types } from 'mongoose';
import { Experience } from './experience.model';
import { Education } from './education.model';
import { Contact } from './contact.model';

/**
 * Interface representing a resume.
 * @interface
 * @extends Document
 */
export interface Resume extends Document {
  name: string;
  email: string;
  age: number;
  mobile: string;
  experiences: Experience[]; // Array of Experience documents
  skills: string[];
  education: Education[];
  contacts: Contact[];
  migrated: boolean;
}

/**
 * Interface representing a Mongoose document for a resume.
 * @interface
 * @extends Resume
 * @extends Document
 */
export interface ResumeDocument extends Resume, Document {}

/**
 * Mongoose schema for the Resume model.
 */
export const ResumeSchema = new Schema<Resume>({
  name: String,
  email: String,
  age: Number,
  mobile: String,
  experiences: [{ type: Types.ObjectId, ref: 'Experience' }],
  skills: [String],
  education: [{ type: Types.ObjectId, ref: 'Education' }],
  contacts: [{ type: Types.ObjectId, ref: 'Contact' }],
  migrated: {
    type: Boolean,
    default: false,
  },
});
