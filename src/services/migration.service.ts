import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume, ResumeDocument } from '../models/resume.model';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { ExperienceDocument } from '../models/experience.model';
import { EducationDocument } from '../models/education.model';
import { ContactDocument } from '../models/contact.model';
import * as fs from 'fs';

@Injectable()
export class MigrationService {
  private readonly resumes: ResumeDocument;
  private readonly experiences: ExperienceDocument;
  private readonly educations: EducationDocument;
  private readonly contacts: ContactDocument;
  constructor(
    @InjectModel('Resume') private readonly resumeModel: Model<ResumeDocument>,
    @InjectModel('Experience')
    private readonly experienceModel: Model<ExperienceDocument>,
    @InjectModel('Education')
    private readonly educationModel: Model<EducationDocument>,
    @InjectModel('Contact')
    private readonly contactModel: Model<ContactDocument>,
  ) {
    const rawResumeData = fs.readFileSync('./json-datas/Resume.json', 'utf8');
    const rawExperienceData = fs.readFileSync(
      './json-datas/Experience.json',
      'utf8',
    );
    const rawEducationData = fs.readFileSync(
      './json-datas/Education.json',
      'utf8',
    );
    const rawContactData = fs.readFileSync(
      './json-datas/Contacts.json',
      'utf8',
    );

    this.resumes = JSON.parse(rawResumeData);
    this.experiences = JSON.parse(rawExperienceData).data;
    this.educations = JSON.parse(rawEducationData).data;
    this.contacts = JSON.parse(rawContactData).data;
  }
  /**
   * This method orchestrates the data migration process.
   * It performs the following steps:
   * 1. Marks all existing resumes as "old" (presumably for filtering or identification purposes). (Calls `markAllAsOldData`)
   * 2. Creates a new resume document using the provided data stored in the service's `resumes` property. (Calls `create`)
   * 3. Associates experiences, educations, and contacts with the newly created resume. (Calls `addExperience`)
   * 4. Logs the migrated resume document to the console for debugging or informational purposes.
   * 5. Returns the migrated resume document.
   *
   * @returns {Promise<Resume>} - A promise resolving to the migrated resume document.
  */
  async migrateData() {
    await this.markAllAsOldData();

    const createdResume = await this.create(this.resumes);
    const resultResume = await this.addExperience(createdResume._id);
    console.log(resultResume);
    return resultResume;
  }

  // this function marks all resumes data as old resumes
  async markAllAsOldData() {
    const resumes = await this.resumeModel.find({ migrated: true });

    const ids = resumes.map((c) => c._id);

    await this.resumeModel.updateMany(
      { _id: { $in: ids } },
      { migrated: false },
    );
  }

  /**
   * This method retrieves all migration data from the service's internal properties.
   * 
   * @returns {object} - An object containing all migration data (resumes, experiences, educations, contacts).
   */
  getDatas() {
    const { resumes, experiences, educations, contacts } = this;
    return {
      resumes,
      experiences,
      educations,
      contacts,
    };
  }

  /**
   * This method creates a new resume document based on the provided `CreateResumeDto` data.
   *
   * @param {CreateResumeDto} createResumeDto - The data used to create the new resume.
   * @returns {Promise<Resume>} - A promise resolving to the newly created `Resume` document.
   */
  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    const createdResume = new this.resumeModel(createResumeDto);
    return createdResume.save();
  }

  /**
   * This method associates experiences, educations, and contacts with a given resume identified by its ID.
   * It performs the following steps:
   * 1. Finds the resume document by ID using `findById`.
   * 2. Inserts the provided experience data (likely from `this.experiences`) as separate experience documents using `insertMany`.
   * 3. Extracts the IDs of the newly created experience documents and stores them in `savedExperiencesIds`.
   * 4. Inserts the provided education data (likely from `this.educations`) as separate education documents using `insertMany`.
   * 5. Extracts the IDs of the newly created education documents and stores them in `savedEducationsIds`.
   * 6. Inserts the provided contact data (likely from `this.contacts`) as separate contact documents using `insertMany`.
   * 7. Extracts the IDs of the newly created contact documents and stores them in `savedContactsIds`.
   * 8. Updates the resume document's `experiences` array by pushing the IDs of the created experience documents using `push`.
   * 9. Updates the resume document's `education` array by pushing the IDs of the created education documents using `push`.
   * 10. Updates the resume document's `contacts` array by pushing the IDs of the created contact documents using `push`.
   * 11. Sets the `migrated` flag of the resume document to `true`, indicating it has been processed.
   * 12. Saves the updated resume document to the database using `save`.
   * 13. Returns the updated resume document with its associated experiences, educations, and contacts (represented by their IDs).
   *
   * @param {string} resumeId - The ID of the resume document to associate experiences, educations, and contacts with.
   * @returns {Promise<Resume>} - A promise resolving to the updated resume document with associated experiences (IDs), educations (IDs), and contacts (IDs).
   */

  async addExperience(resumeId: string): Promise<Resume> {
    const resume = await this.resumeModel.findById(resumeId);
    const savedExperiences = await this.experienceModel.insertMany(
      this.experiences,
    );

    const savedExperiencesIds = savedExperiences.map((xp) => xp._id);

    const savedEducations = await this.educationModel.insertMany(
      this.educations,
    );

    const savedEducationsIds = savedEducations.map((e) => e._id);
    const savedContacts = await this.contactModel.insertMany(this.contacts);
    const savedContactsIds = savedContacts.map((skill) => skill._id);

    resume.experiences.push(...savedExperiencesIds);
    resume.education.push(...savedEducationsIds);
    resume.contacts.push(...savedContactsIds);
    resume.migrated = true;
    await resume.save();

    return resume;
  }

}
