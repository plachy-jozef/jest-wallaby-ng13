import { EUserEmplyeeType, IUserServer } from "../shared-components/shared.interfaces";

export const USER_COMPANY_A: IUserServer = {
	cn: 'Joe Doe',
	emailaddress: 'joe.doe@companyA.com',
	employeeType: EUserEmplyeeType.COMPANY_A,
	firstName: 'Joe',
	lastName: 'Doe',
  canSwitchCompanyFlag: 1,
  updateDocTypes: [],
  userRoles: [],
  company_flag: 1,
  userAccessUpdate: []
};

export const USER_COMPANY_B: IUserServer = {
	cn: 'Jane Foe',
	emailaddress: 'jane.foe@companyB.com',
	employeeType: EUserEmplyeeType.COMPANY_B,
	firstName: 'Jane',
	lastName: 'Foe',
  canSwitchCompanyFlag: 0,
  updateDocTypes: [],
  userRoles: [],
  company_flag: 2,
  userAccessUpdate: []
};