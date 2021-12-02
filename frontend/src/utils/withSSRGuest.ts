import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

/**
 *
 * @description Função utilizada para redirecionar o usuário para a pagina home caso tente acessar
 * uma pagina que so é permitida para usuários nao autenticados

 * @param fn Recebe como parâmetro uma função do tipo 'GetServerSideProps' onde é passado como generics
 * os valores das props que serão retornadas na função GetServerSideProps da pagina acessada

 * @returns
 * Retorna uma Promise do tipo "GetServerSidePropsResult" tendo como retorno o redirecionamento do usuário
 * para a pagina dashboard caso o mesmo já esteja autenticado ou retornado a o resultado da execução da função recebida como parâmetro
 * caso o usuário não esteja autenticado
 */
export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies['auth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
    return await fn(ctx);
  };
}
