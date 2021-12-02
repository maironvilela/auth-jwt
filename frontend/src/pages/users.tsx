import { GetServerSideProps } from 'next';
import { useAuthContext } from '../hooks/useAuthContext';

import { withSSRAuth } from '../utils/withSSRAuth';

export default function Users() {
  const { signOut } = useAuthContext();
  return (
    <>
      <h1>Lista de Usuarios </h1>
      <button onClick={() => signOut()}>SAIR</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async ctx => {
    return {
      props: {},
    };
  },
  { roles: ['editor'], permissions: [] },
);
