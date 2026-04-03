import { useAppSelector } from '@/app/store';

/**
 * Custom Authentication Hooks
 * 
 * Target: Encapsulate logic related to auth state so components stay clean.
 * Usage: 
 * ```ts
 * const { isSuperAdmin } = useAuthRoles();
 * if (isSuperAdmin) { ... }
 * ```
 */

export const useAuthRoles = () => {
  const user = useAppSelector((state) => state.auth.user);
  
  // Example dummy logic
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const canEditPlan = user?.permissions?.includes('EDIT_PLAN') ?? false;

  return { isSuperAdmin, canEditPlan };
};
