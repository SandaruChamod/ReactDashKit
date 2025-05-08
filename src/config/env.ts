import { environment as devEnvironment } from './env.dev';
import { environment as prodEnvironment } from './env.prod';

interface Environment {
  production: boolean;
  apiUrl: string;
  version: string;
  logLevel: string;
}

// Select the appropriate environment based on build mode
const isProduction = import.meta.env.PROD;
export const environment: Environment = isProduction ? prodEnvironment : devEnvironment;