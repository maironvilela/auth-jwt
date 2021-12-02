import { ReactNode } from 'react';
import { useCanAccess } from '../hooks/useCanAccess';

interface CanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export const Can = ({ children, permissions, roles }: CanProps) => {
  const useCanSeeComponent = useCanAccess({ permissions, roles });

  if (!useCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
};
