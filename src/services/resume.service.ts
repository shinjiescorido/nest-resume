import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume, ResumeDocument } from '../models/resume.model';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { CreateEducationDto } from '../dto/create-education.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ExperienceDocument } from '../models/experience.model';
import { EducationDocument } from '../models/education.model';
import { ContactDocument } from '../models/contact.model';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel('Resume') private readonly resumeModel: Model<ResumeDocument>,
    @InjectModel('Experience')
    private readonly experienceModel: Model<ExperienceDocument>,
    @InjectModel('Education')
    private readonly educationModel: Model<EducationDocument>,
    @InjectModel('Contact')
    private readonly contactModel: Model<ContactDocument>,
  ) {}
  
  /**
   * Fetches a single resume document that has been marked as migrated.
   * It also populates (eagerly loads) the associated experience, education, and contact data.
   * 
   * This method is likely intended to fetch the most recently migrated resume, 
   * assuming there's a single document with `migrated: true`. If you need to fetch all migrated resumes,
   * consider using `find` with a filter instead.
   *
   * @returns {Promise<Resume>} - A promise resolving to a single fetched resume document with populated experience, education, and contact data, 
   * or null if no migrated resume is found.
   */
  async fetchResumes(): Promise<Resume> {
    const resumes = await this.resumeModel
      .findOne({ migrated: true })
      .populate('experiences')
      .populate('education')
      .populate('contacts');

    return resumes;
  }

  /**
   * Fetches a resume document from the database by its ID.
   * It also populates (eagerly loads) the associated experience, education, and contact data.
   *
   * @param {string} resumeId - The ID of the resume document to fetch.
   * @returns {Promise<Resume>} - A promise resolving to the fetched resume document with populated experience, education, and contact data.
  */
  async fetchResumeById(resumeId: string): Promise<Resume> {
    const resume = await this.resumeModel
      .findById(resumeId)
      .populate('experiences')
      .populate('education')
      .populate('contacts');

    return resume;
  }

  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    const createdResume = new this.resumeModel(createResumeDto);
    return createdResume.save();
  }

  /**
   * Adds a new experience entry to the specified resume document.
   *
   * @param {string} resumeId - The ID of the resume document to associate the experience with.
   * @param {CreateExperienceDto} createExperienceDto - The data used to create the new experience entry.
   * @returns {Promise<Resume>} - A promise resolving to the updated resume document with the added experience.
 */
  async addExperience(
    resumeId: string,
    createExperienceDto: CreateExperienceDto,
  ): Promise<Resume> {
    const resume = await this.resumeModel.findById(resumeId);
    const experience = new this.experienceModel(createExperienceDto); // Ensure Experience is used correctly
    resume.experiences.push(experience);
    await experience.save();
    await resume.save();
    return resume;
  }

  /**
   * Adds a new education entry to the specified resume document.
   *
   * @param {string} resumeId - The ID of the resume document to associate the education with.
   * @param {CreateEducationDto} createEducationDto - The data used to create the new education entry.
   * @returns {Promise<Resume>} - A promise resolving to the updated resume document with the added education.
   */
  async addEducation(
    resumeId: string,
    createEducationDto: CreateEducationDto,
  ): Promise<Resume> {
    const resume = await this.resumeModel.findById(resumeId);
    const education = new this.educationModel(createEducationDto);
    resume.education.push(education);
    await education.save();
    await resume.save();
    return resume;
  }
  /**
   * Adds a new contact entry to the specified resume document.
   *
   * @param {string} resumeId - The ID of the resume document to associate the contact with.
   * @param {CreateContactDto} createContactDto - The data used to create the new contact entry.
   * @returns {Promise<Resume>} - A promise resolving to the updated resume document with the added contact.
   */
  async addContact(
    resumeId: string,
    createContactDto: CreateContactDto,
  ): Promise<Resume> {
    const resume = await this.resumeModel.findById(resumeId);
    const contact = new this.contactModel(createContactDto);
    resume.contacts.push(contact);
    await contact.save();
    await resume.save();
    return resume;
  }
}
