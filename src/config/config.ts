// HACK: to import json
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import jsonFileConfigDev from './app-dev.json' assert { type: 'json' };
import jsonFileConfigProd from './app-prod.json' assert { type: 'json' };
import jsonFilePolicies from './policies.json' assert { type: 'json' };

import { TEnvironment, IConfig } from "./config.type.js";

const conFile: string = process.env.NODE_ENV || 'dev';
const config: any = Object.assign({}, conFile == 'dev' ? jsonFileConfigDev : jsonFileConfigProd);

const policies: any = Object.assign({}, jsonFilePolicies);
export { config, policies };
