import { EducationInformation } from './education-information';
import { FamilyInformation } from './family-informations';
import { EmergencyContact } from './emergency-contact';
import { PersonalInformation } from './personal-info';
export class UserAdd {
  educationInformations = new Array<EducationInformation>();
  familyInformations    = new Array<FamilyInformation>();
  emergencyContacts     = new Array<EmergencyContact>();
  personalInfo          = new PersonalInformation();
}
