export enum ECompanies {
	COMPANY_A = 'A',
	COMPANY_B = 'B'
}

export enum ECompanyFlag {
	COMPANY_A = 1,
	COMPANY_B = 2
}

export type Company = ECompanies.COMPANY_A | ECompanies.COMPANY_B;
export type CompanyFlag = ECompanyFlag.COMPANY_A | ECompanyFlag.COMPANY_B;

export interface IUserServer {
	canSwitchCompanyFlag: number;
	cn: string;
  company_flag: number;
	emailaddress: string;
	firstName: string;
	lastName: string;
  updateDocTypes: Array<any>;
  userRoles: Array<any>;
	employeeType: string;
  userAccessUpdate: Array<IServerDocTypes>;
}

export enum EUserEmplyeeType {
	COMPANY_A = 'P',
	COMPANY_B = 'H'
}

export type EmployeeType = EUserEmplyeeType.COMPANY_A | EUserEmplyeeType.COMPANY_B;

export interface IUser {
	canSwitchCompanyFlag: boolean;
	cn: string;
	company_flag: CompanyFlag;
	emailaddress: string;
	firstName: string;
	lastName: string;
	updateDocTypes: Array<IServerDocTypes>;
	userRoles: Array<IUserRole>;
	employeeType?: string;
}

export interface IServerDocTypes {
	PROP_1: string;
	PROP_2: string;
	PROP_3: string;
	PROP_4: string;
}

export interface IUserRole {
	ROLE: string;
}

export interface IAccessGranulation {
	PROP_A: string;
	PROP_B: string;
	PROP_C: string;
}

export interface IUserDocTypes {
	FOO: string;
	BAR: string;
	granulation: IAccessGranulation;
}

export enum EThemeClasses {
	COMPANY_A = 'theme-a',
	COMPANY_B = 'theme-b'
}

export type ThemeClass = EThemeClasses.COMPANY_B | EThemeClasses.COMPANY_A;

export enum EUserVentureCode {
	COMPANY_A = 'X',
	COMPANY_B = 'Y'
}

export type VentureCode = EUserVentureCode.COMPANY_A | EUserVentureCode.COMPANY_B;

export interface IExtraAccess {
	ACCESS: string;
}

export class UserNext {
	private _cn: string = null;
	private _emailaddress: string = null;
	private _firstName: string = null;
	private _lastName: string = null;
	private _userRoles: Array<IUserRole> = [];
	private _authDocTypes: Array<IUserDocTypes> = [];
	private _company_flag: CompanyFlag = null;
	private _canSwitchCompanyFlag: boolean = null;
	private _updateDocTypes: Array<IServerDocTypes> = [];

	private _companyColor: ThemeClass = null;

	private _employeeType: EmployeeType = null;

	private _ventureCode: VentureCode = null;

	constructor(user: IUser) {
		this.user = user;
	}

	/** @description setting new user object based on transform user object got from server /details route */
	set user(user: IUser) {
		Object.keys(user).forEach((key: string) => {
			const privateKey = `_${ key }`;
			this[privateKey] = this.hasOwnProperty(privateKey) ? user[key] : null;
		});

		this.setCompanyColor(this._company_flag);
	}

	/** @description return user object of logged user */
	get user(): IUser {
		return {
			cn: this._cn,
			emailaddress: this._emailaddress,
			userRoles: this._userRoles,
			firstName: this._firstName,
			lastName: this._lastName,
			employeeType: this._employeeType,
			company_flag: this._company_flag,
			canSwitchCompanyFlag: this._canSwitchCompanyFlag,
			updateDocTypes: this._updateDocTypes,
		};
	}

	/** @description check if logged user has any roles */
	hasRole(): boolean {
		return this._userRoles && this._userRoles.length > 0;
	}

	/** @todo probably delete, not in use anywhere */
	missingRole(): boolean {
		return this._userRoles && this._userRoles.length === 0;
	}

	/** @description return all roles of logged user */
	getRoles(): Array<IUserRole> {
		return this._userRoles;
	}

	/** @description return email of logged user */
	getEmail(): string {
		return this._emailaddress;
	}

	/** @description return whole name of logged user */
	getCn(): string {
		return this._cn;
	}

	setAuthDocTypes(ds: Array<IServerDocTypes>, authFlag: string) {
		this._authDocTypes = [];
		ds.forEach((d: IServerDocTypes) => {
			const doc: IUserDocTypes = {
				FOO: d.PROP_1.trim(),
				BAR: authFlag.trim(),
				granulation: {
					PROP_A: d.PROP_2.trim(),
					PROP_B: d.PROP_3.trim(),
					PROP_C: d.PROP_4.trim(),
				}
			};
			this._authDocTypes.push(doc);
		});
	}

	getAuthDocTypes(): Array<IUserDocTypes> {
		return this._authDocTypes;
	}

	getCompany(): ECompanies {
		return this._company_flag === ECompanyFlag.COMPANY_B ? ECompanies.COMPANY_B : ECompanies.COMPANY_A;
	}

	getCompanyFlag(): CompanyFlag {
		return this._company_flag;
	}

	canSwitchCompanyFlag(): boolean {
		return this._canSwitchCompanyFlag;
	}

	setCompanyColor(companyFlag: CompanyFlag): void {
		this._companyColor = companyFlag === ECompanyFlag.COMPANY_B ? EThemeClasses.COMPANY_B : EThemeClasses.COMPANY_A;
	}

	getCompanyColor(): ThemeClass {
		return this._companyColor;
	}
}
