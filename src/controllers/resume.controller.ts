import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ResumeService } from '../services/resume.service';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { Contact } from '../models/contact.model';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { Resume } from '../models/resume.model';
/**
 * The ResumeController class handles incoming HTTP requests related to resumes.
 * It interacts with the `ResumeService` to perform CRUD (Create, Read, Update, Delete) operations on resumes.
 */
@Controller('resume')
export class ResumeController {
  /**
   * Injects the `ResumeService` dependency for interacting with resume data.
   * @param {ResumeService} resumeService - The resume service instance.
   */
  constructor(private readonly resumeService: ResumeService) {}

  /**
   * Fetches a list of all resumes.
   *
   * @route GET /resume/
   * @returns {Promise<Resume[]>} A promise resolving to an array of `Resume` objects.
   */
  @Get('/')
  async fetchResumes(): Promise<Resume> {
    return this.resumeService.fetchResumes();
  }

  /**
   * Fetches a single resume by its ID.
   *
   * @route GET /resume/:resumeId/
   * @param {string} resumeId - The ID of the resume to fetch.
   * @returns {Promise<Resume>} A promise resolving to a single `Resume` object.
   */
  @Get(':resumeId/')
  async fetchResumeById(@Param('resumeId') resumeId: string): Promise<Resume> {
    return this.resumeService.fetchResumeById(resumeId);
  }

  /**
   * Creates a new resume.
   *
   * @route POST /resume/create
   * @param {CreateResumeDto} createResumeDto - The data used to create the new resume.
   * @returns {Promise<Resume>} A promise resolving to the newly created `Resume` object.
   */
  @Post('create')
  async createResume(
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.create(createResumeDto);
  }

  /**
   * Adds an experience to an existing resume.
   *
   * @route POST /resume/:resumeId/experiences
   * @param {string} resumeId - The ID of the resume to add the experience to.
   * @param {Experience} experience - The experience data to add.
   * @returns {Promise<Resume>} A promise resolving to the updated `Resume` object.
   */
  @Post(':resumeId/experiences')
  async addExperience(
    @Param('resumeId') resumeId: string,
    @Body() experience: Experience,
  ): Promise<Resume> {
    return this.resumeService.addExperience(resumeId, experience);
  }

  /**
   * Adds an education to an existing resume.
   *
   * @route POST /resume/:resumeId/educations
   * @param {string} resumeId - The ID of the resume to add the education to.
   * @param {Education} education - The education data to add.
   * @returns {Promise<Resume>} A promise resolving to the updated `Resume` object.
   */
  @Post(':resumeId/educations')
  async addEducation(
    @Param('resumeId') resumeId: string,
    @Body() education: Education,
  ): Promise<Resume> {
    return this.resumeService.addEducation(resumeId, education);
  }

  /**
   * Adds contact information to an existing resume.
   *
   * @route POST /resume/:resumeId/contacts
   * @param {string} resumeId - The ID of the resume to add the contact information to.
   * @param {Contact} contact - The contact data to add.
   * @returns {Promise<Resume>} A promise resolving to the updated `Resume` object.
   */
  @Post(':resumeId/contacts')
  async addContact(
    @Param('resumeId') resumeId: string,
    @Body() contact: Contact,
  ): Promise<Resume> {
    return this.resumeService.addContact(resumeId, contact);
  }
}
