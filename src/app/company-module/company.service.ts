import { Injectable } from '@angular/core';
import { AuthService } from '@shared/authentication/auth.service';
import { Company, CompanyFlag, ECompanies, ECompanyFlag } from '@shared/shared.interfaces';
import { ICompanySpecs } from './company.model';
import { EcompanyASpecs } from './companyA/company-A.constants';
import { ECompanyBSpecs } from './companyB/company-B.constants';

@Injectable({
	providedIn: 'root'
})
export class CompanyService {
	companyLinks: ICompanySpecs;

	constructor(
		private _authService: AuthService
	) {
		this.revalidateCompany(this._authService.userInApp.getCompanyFlag());
	}

	public revalidateCompany(companyFlag: CompanyFlag): void {
		if (companyFlag === ECompanyFlag.COMPANY_A) {
			this.companyLinks = EcompanyASpecs;
		} else {
			this.companyLinks = ECompanyBSpecs;
		}
	}

	public getAppLink(): string {
		return this.companyLinks.LINK_1;
	}

	public getSlackLink(): string {
		return this.companyLinks.LINK_2;
	}

	public getSlackLabel(): string {
		return this.companyLinks.LINK_3;
	}

	public getCommunityLink(): string {
		return this.companyLinks.LINK_4;
	}

	public getUserGuidLink(): string {
		return this.companyLinks.LINK_5;
	}

	public selectCompanyBy(companyFlag: CompanyFlag): Company {
		return companyFlag === ECompanyFlag.COMPANY_B ? ECompanies.COMPANY_B : ECompanies.COMPANY_A;
	}

	public selectCompanyFlagBy(company: Company): CompanyFlag {
		return company === ECompanies.COMPANY_B ? ECompanyFlag.COMPANY_B : ECompanyFlag.COMPANY_A;
	}

	public getCapitalCoordinatorList(): string {
		return this.companyLinks.LINK_6;
	}
}
