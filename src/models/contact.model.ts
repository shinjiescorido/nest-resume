import { Document, Schema } from 'mongoose';

/**
 * Interface representing a contact.
 */
export interface Contact extends Document {
  name: string;
  company: string;
  role: string;
  mobile: string;
  email: string;
}

/**
 * Interface representing a Mongoose document for contact.
 */
export interface ContactDocument extends Contact, Document {}

/**
 * Mongoose schema for the Contact model.
 */
export const ContactSchema = new Schema<Contact>({
  name: String,
  company: String,
  role: String,
  mobile: String,
  email: String,
});

export default Contact;
