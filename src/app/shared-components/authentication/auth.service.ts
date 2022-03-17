import { IEnvKeywords, ENV_KEYWORDS, ENV, Environment, ENVIRONMENTS } from './environment.consts';
import { LocalStorage } from '../local-storage';
import { Inject, Injectable } from "@angular/core";
import { UserNext } from '../shared.interfaces';

@Injectable()
export class AuthService {
  userInApp: UserNext

  currentHostName: string;
  envKeys: IEnvKeywords;
	envToUse: ENV;
	environment: Environment;

  isEnv1: boolean;
	isEnv2: boolean;
	isEnv3: boolean;

  constructor(
    @Inject(LocalStorage) private localStorage: any
  ) {
		this.currentHostName = this._getCurrentHostName();
		this.envKeys = this._getEnvKeys();
		this.envToUse = this._urlEval(this.currentHostName, this.envKeys);
		this.isEnv1 = this._evalEnv(this.envKeys.ENV_1);
		this.isEnv2 = this._evalEnv(this.envKeys.ENV_2);
		this.isEnv3 = this._evalEnv(this.envKeys.ENV_3);
		this.environment = this._selectEnvironment();
  }

  protected _getCurrentHostName(): string {
		return window.location.origin;
	}

  protected _getEnvKeys(): IEnvKeywords {
		return ENV_KEYWORDS;
	}

  protected _urlEval(hostname: string, envKeys: IEnvKeywords): ENV {
		let envToUse: ENV;
		Object.keys(envKeys)
			.filter((key: string) => hostname.includes(envKeys[key]))
			.map((filteredKey: string) => envToUse = envKeys[filteredKey]);
		envToUse = this._fallBackToProd(envToUse);
		return envToUse;
	}

  protected _fallBackToProd(envToUse: ENV): ENV {
		return !!envToUse ? envToUse : ENV_KEYWORDS.ENV_3;
	}

	protected _evalEnv(envKey: string): boolean {
		return window.location.origin.includes(envKey);
	}

  protected _selectEnvironment(): Environment {
		let env: Environment;
		const host = window.location.origin;
		if (host.includes(ENV_KEYWORDS.ENV_1)) {
			env = ENVIRONMENTS.ENV_1;
		} else if (host.includes(ENV_KEYWORDS.ENV_2)) {
			env = ENVIRONMENTS.ENV_2;
		} else {
			env = ENVIRONMENTS.ENV_3;
		}
		return env;
	}
}