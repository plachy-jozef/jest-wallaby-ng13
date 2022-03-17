import { IUser, IUserServer } from "../shared-components/shared.interfaces";

export function parseRawUser(serverUser: IUserServer): IUser {
	const rawUser: IUser = initUser();
	Object.keys(rawUser)
		.forEach((key: string) => {
			if (serverUser.hasOwnProperty(key)) {
				rawUser[key] = key === 'canSwitchCompanyFlag' ? serverUser[key] === 1 : serverUser[key];
			}
		});
	rawUser.updateDocTypes = serverUser.userAccessUpdate && serverUser.userAccessUpdate.length > 0
		? serverUser.userAccessUpdate
		: [];
	return rawUser;
}

function initUser(): IUser {
	return {
		emailaddress: null,
		cn: null,
		userRoles: [],
		firstName: null,
		lastName: null,
		employeeType: null,
		company_flag: 1,
		canSwitchCompanyFlag: true,
		updateDocTypes: [],
	};
}