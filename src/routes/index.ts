/**
 * 🧱 Routes Export Hub
 * 
 * Target: Act as the central Index/Barrel file for all route configurations.
 * Allows other files to import cleanly like: `import { ROUTES, AppRoutes } from '../routes';`
 * 
 * Helps avoid long relative import paths.
 */

export * from './routes';
export * from './AppRoutes';
export * from './PrivateRoute';
export * from './PublicRoute';
