// import { Experience } from '../models/experience.model';
// import { Education } from '../models/education.model';
// import { Contact } from '../models/contact.model';
export class CreateResumeDto {
  readonly name: string;
  readonly email: string;
  readonly age: number;
  readonly mobile: string;
  readonly skills: string[];
  // readonly experience: Experience[];
  // readonly education: Education[];
  // readonly contact: Contact[];
}
