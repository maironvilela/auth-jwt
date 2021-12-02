/* eslint-disable dot-notation */
import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '../services/axios/apiClient';
import { GetServerSidePropsContext } from 'next';

type SigInCredentials = {
  login: string;
  password: string;
};

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn(credentials: SigInCredentials): Promise<void>;
  signOut(ctx?: GetServerSidePropsContext): Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          Router.push('/');
          break;
        case 'signIn':
          // Router.push('/dashboard');
          window.location.replace('http://localhost:3000/dashboard');

          break;
      }
    };
  }, []);

  useEffect(() => {
    const { 'auth.token': token } = parseCookies();
    if (token) {
      api
        .get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data;
          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch(() => {
          Router.push('/');
        });
      // eslint-disable-next-line dot-notation
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      // Router.push('/dashboard');
    }
  }, []);

  const signIn = async ({ login, password }: SigInCredentials) => {
    try {
      const response = await api.post('sessions', {
        email: login,
        password,
      });

      const { permissions, roles, refreshToken, token } = response.data;

      cookiesSetUsers('auth.token', token);
      cookiesSetUsers('auth.refreshToken', refreshToken);

      setUser({
        email: login,
        permissions,
        roles,
      });
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      Router.push('/dashboard');
      authChannel.postMessage('signIn');
    } catch (err) {}
  };

  const signOut = async (ctx: GetServerSidePropsContext = undefined) => {
    destroyCookie(ctx, 'auth.token');
    destroyCookie(ctx, 'auth.refreshToken');

    authChannel.postMessage('signOut');
    Router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function cookiesSetUsers(name: string, value: string, ctx = undefined) {
  setCookie(ctx, name, value, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/', // endereço da aplicação que terá acesso ao cookie
  });
}
