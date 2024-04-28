import { MigrationService } from '../../../services/migration.service';
import { Model } from 'mongoose';

import { Resume, ResumeDocument } from '../../../models/resume.model';
import { Education, EducationDocument } from '../../../models/education.model';
import {
  Experience,
  ExperienceDocument,
} from '../../../models/experience.model';

import { Contact, ContactDocument } from '../../../models/contact.model';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
let service: MigrationService;
let resumeModel: Model<ResumeDocument>;
let experienceModel: Model<ExperienceDocument>;
let educationModel: Model<EducationDocument>;
let contactModel: Model<ContactDocument>;

const mockExperienceModel = jest.fn(() => ({
  insertMany: jest.fn(),
}));

const mockResumeModel = jest.fn(() => ({
  find: jest.fn(),
  updateMany: jest.fn(),
  findById: jest.fn(),
  insertMany: jest.fn(),
  save: jest.fn(),
}));

const mockContactModel = jest.fn(() => ({
  insertMany: jest.fn(),
}));

const mockEducationModel = jest.fn(() => ({
  insertMany: jest.fn(),
}));

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MigrationService,
      {
        provide: getModelToken('Resume'),
        useValue: mockResumeModel(),
      },
      {
        provide: getModelToken('Experience'),
        useValue: mockExperienceModel(),
      },
      {
        provide: getModelToken('Education'),
        useValue: mockEducationModel(),
      },
      {
        provide: getModelToken('Contact'),
        useValue: mockContactModel(),
      },
    ],
  }).compile();

  service = module.get(MigrationService);
  resumeModel = module.get(getModelToken('Resume'));
  experienceModel = module.get(getModelToken('Experience'));
  educationModel = module.get(getModelToken('Education'));
  contactModel = module.get(getModelToken('Contact'));
});
describe('MS=>', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
