/* eslint-disable dot-notation */
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { cookiesSetUsers } from '../../context/AuthContext';
import { AuthTokenError } from '../../errors/AuthTokenError';

let isRefreshingToken = false;
let failedRequestQueue = [];

export function setupAPIClient(ctx: GetServerSidePropsContext = undefined) {
  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['auth.token']}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          // recupera todos cookies
          cookies = parseCookies(ctx);
          // recupera o refresh token dos cookies
          const { 'auth.refreshToken': refreshToken } = cookies;

          // Constante que armazena as informações do request para repetir as requisições em caso de falha
          const originalConfig = error.config;
          // Verifica se ja está sendo realizando um refresh token
          if (!isRefreshingToken) {
            isRefreshingToken = true;
            // realiza chamada a API na rota para recuperar o token a partir do refresh token
            api
              .post('/refresh', {
                refreshToken,
              })
              .then(response => {
                const { token } = response.data;

                // seta nos cookies os novos token e refresh token
                cookiesSetUsers('auth.token', token, ctx);
                cookiesSetUsers(
                  'auth.refreshToken',
                  response.data.refreshToken,
                  ctx,
                );

                // Atualiza o token no header das requisições
                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                // Realiza  a chamada a função onSuccess das requisições que falharam que foi adicionado a fila
                failedRequestQueue.forEach(request => request.onSuccess(token));
                failedRequestQueue = [];
              })
              .catch(error => {
                /* ' Realiza  a chamada a função onSuccess das requisições que falharam que foi adicionado
            a fila, passando como parâmetro o erro
            */
                failedRequestQueue.forEach(request => request.onFailure(error));
                failedRequestQueue = [];
                if (process.browser) {
                  // signOut(ctx);

                  destroyCookie(ctx, 'auth.token');
                  destroyCookie(ctx, 'auth.refreshToken');
                  Router.push('/');
                }
              })
              .finally(
                () =>
                  // seta como true a variável que controla a execução do refresh token
                  (isRefreshingToken = false),
              );
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              // função a ser executada em caso de sucesso
              onSuccess: (newToken: string) => {
                // substitui o token expirado pelo novo token
                originalConfig.headers['Authorization'] = `Bearer ${newToken}`;
                /* Realiza uma nova chamada a API utilizando o resolve da promise para que
                o axios aguarde a finalização da requisição
              */
                resolve(api(originalConfig));
              },
              // função a ser executada em caso de falhas
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          if (process.browser) {
            destroyCookie(ctx, 'auth.token');
            destroyCookie(ctx, 'auth.refreshToken');
            Router.push('/');
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }
      // Repassa a resposta da requisição para a função que realizou a chamada
      return Promise.reject(error);
    },
  );

  return api;
}
