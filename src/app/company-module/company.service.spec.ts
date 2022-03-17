import { TestBed, TestBedStatic } from '@angular/core/testing';
import { AuthService } from '@shared/authentication/auth.service';
import { CompanyFlag, ECompanyFlag, IUser, UserNext } from '@shared/shared.interfaces';
import { USER_COMPANY_A, USER_COMPANY_B } from '@src/app/company-module/__mocked.data';
import { CompanyService } from './company.service';
import { parseRawUser } from './__utilities';

let testBed: TestBedStatic;
let companyService: CompanyService;

describe('Company Service for COMPANY_A user', () => {
	beforeEach(() => {
		const COMPANY_FLAG: CompanyFlag = ECompanyFlag.COMPANY_A;
		testBed = createTestBed(COMPANY_FLAG);
		companyService = testBed.inject(CompanyService);
	});

	it('should exist', () => {
		expect(companyService).toBeTruthy();
	});

	it(`should return 'https://company.a.link.1.com'as CRB link`, () => {
		const result = companyService.getAppLink();
		expect(result).toBe('https://company.a.link.1.com');
	});

	it(`should return 'https://company.a.link.2.com'as slack url`, () => {
		const result = companyService.getSlackLink();
		expect(result).toBe('https://company.a.link.2.com');
	});

	it(`should return 'company a' as SLACK label`, () => {
		const result = companyService.getSlackLabel();
		expect(result).toBe('company a');
	});

	it(`should return 'https://company.a.link.3.com' as publisher url`, () => {
		const result = companyService.getCommunityLink();
		expect(result).toBe('https://company.a.link.3.com');
	});

	it(`should return 'https://company.a.link.4.com' as User Guide url`, () => {
		const result = companyService.getUserGuidLink();
		expect(result).toBe('https://company.a.link.4.com');
	});
});

/**
 * Classes and Data constants that should be tailored for each tested class independently
 * and can't be shareble due to selector clashes
 */
function createTestBed(companyFlag: CompanyFlag): TestBedStatic {
	const SERVER_USER = companyFlag === ECompanyFlag.COMPANY_A ? USER_COMPANY_A : USER_COMPANY_B;
	const iUser: IUser = parseRawUser(SERVER_USER);
	const user: UserNext = new UserNext(iUser);

	const authService = new AuthMockService();
	authService.userInApp = user;

	return TestBed.configureTestingModule({
		providers: [
			CompanyService,
			{ provide: AuthService, useValue: authService }
		],
	});
}

class AuthMockService {
	userInApp: UserNext;

	constructor() {
	}
}
