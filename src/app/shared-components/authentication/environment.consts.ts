export enum ENV_KEYWORDS {
	ENV_1 = 'host1',
  ENV_2 = 'host2',
  ENV_3 = 'host3',
}

export type ENV = ENV_KEYWORDS.ENV_1 | ENV_KEYWORDS.ENV_2 | ENV_KEYWORDS.ENV_3;

export interface IEnvKeywords {
	ENV_1: string;
  ENV_2: string;
  ENV_3: string;
}

export enum ENVIRONMENTS {
	ENV_1 = 'env1',
	ENV_2 = 'env2',
	ENV_3 = 'env3',
}

export type Environment = ENVIRONMENTS.ENV_1 | ENVIRONMENTS.ENV_2 | ENVIRONMENTS.ENV_3;