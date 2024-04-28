import { ResumeController } from '../../../controllers/resume.controller';
import { ResumeService } from '../../../services/resume.service';
import {
  Experience,
  ExperienceDocument,
} from '../../../models/experience.model';
import { Education } from '../../../models/education.model';
import { Contact } from '../../../models/contact.model';
import { CreateResumeDto } from '../../../dto/create-resume.dto';
import { CreateExperienceDto } from '../../../dto/create-experience.dto';

import { Resume } from '../../../models/resume.model';

/**
 * Unit tests for the ResumeController class.
 */
describe('ResumeController', () => {
  let resumeController: ResumeController;
  let resumeService: ResumeService;
  const currentDate = new Date();

  // Sample data for testing
  const sampleResume: CreateResumeDto = {
    name: 'Shinji P. Escorido',
    email: 'shinji.escorido@gmail.com',
    age: 37,
    mobile: '+63-966-356-1354',
    skills: [
      'NodeJS',
      'VueJS',
      'React',
      'AWS',
      'Unit-testing',
      'CI/CD',
      'GIT',
      'PHP',
      'SQL/NoSQL',
      'MICROSERVICES',
    ],
  };
  const experience: Experience = {
    position: 'API DEVELOPER',
    company: 'Collabera Digital',
    startDate: currentDate,
    endDate: currentDate,
    description: 'sad',
  } as Experience;

  const education: Education = {
    school: 'SAINT ALPHONSUS CATHOLIC SCHOOL',
    course: 'Secondary Education Graduate',
    date: currentDate,
  } as Education;

  const contact: Contact = {
    name: 'a Hermosa',
    role: 'a Resource',
    company: 'a',
    mobile: '+639052382296',
    email: 'a.a@a.com',
  } as Contact;

  beforeEach(() => {
    // Mock ResumeService
    resumeService = {
      fetchResumes: jest.fn().mockResolvedValue([]),
      fetchResumeById: jest.fn().mockResolvedValue(sampleResume),
      create: jest.fn().mockResolvedValue(sampleResume),
      addExperience: jest.fn().mockResolvedValue(sampleResume),
      addEducation: jest.fn().mockResolvedValue(sampleResume),
      addContact: jest.fn().mockResolvedValue(sampleResume),
      removeExperience: jest.fn().mockResolvedValue(sampleResume),
    } as any;

    // Create an instance of ResumeController with the mock ResumeService
    resumeController = new ResumeController(resumeService);
  });

  /**
   * Test suite for the fetchResumes method of the ResumeController class.
   */
  describe('fetchResumes', () => {
    /**
     * Test case to verify that ResumeService.fetchResumes is called and returns the expected result.
     */
    it('should call resumeService.fetchResumes and return the result', async () => {
      const expectedResult: Resume[] = [];

      const result = await resumeController.fetchResumes();

      expect(resumeService.fetchResumes).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  // More test suites and test cases can be added similarly for other methods

});
