interface IValidadeUserPermission {
  user: {
    permissions: string[];
    roles: string[];
  };
  permissions?: string[];
  roles?: string[];
}

/**
 *
 * @param permissions Permissões de acesso da pagina
 * @param roles Funções permitidas para acesso da pagina
 * @param user Usuário logado no sistema
 * @returns retorna um booleano informado se o usuário possui ou nao as permissões para acessar a pagina
 */
export const validateUserPermissions = ({
  permissions,
  roles,
  user,
}: IValidadeUserPermission) => {
  // Verifica se o usuário possui todas as permissões
  if (permissions.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles.length > 0) {
    const hasRolesPermission = roles.some(role => {
      return user.roles.includes(role);
    });

    if (!hasRolesPermission) {
      return false;
    }
  }

  return true;
};
