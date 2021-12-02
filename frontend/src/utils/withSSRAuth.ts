import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import decode from 'jwt-decode';

import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../errors/AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

type Options = {
  roles: string[];
  permissions: string[];
};
export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: Options) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['auth.token'];

    if (!token) {
      destroyCookie(ctx, 'auth.token');
      destroyCookie(ctx, 'auth.refreshToken');

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (options) {
      // decodifica os cookies
      const user = decode<{ permissions: string[]; roles: string[] }>(token);

      const { roles, permissions } = options;
      const userCanAccessPage = validateUserPermissions({
        roles,
        permissions,
        user,
      });

      if (!userCanAccessPage) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'auth.token');
        destroyCookie(ctx, 'auth.refreshToken');
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
}
