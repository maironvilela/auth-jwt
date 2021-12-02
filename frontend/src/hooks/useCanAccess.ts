import { validateUserPermissions } from '../utils/validateUserPermissions';
import { useAuthContext } from './useAuthContext';

interface IUseCanAccessProps {
  roles?: string[];
  permissions?: string[];
}

export const useCanAccess = ({
  roles = [],
  permissions = [],
}: IUseCanAccessProps) => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return false;
  }

  const userHasPermission = validateUserPermissions({
    roles,
    permissions,
    user,
  });

  return userHasPermission;
};
