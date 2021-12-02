import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { useAuthContext } from '../hooks/useAuthContext';
import { api } from '../services/axios/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupAPIClient } from '../services/axios';
import { Can } from '../components/Can';

export default function Dashboard() {
  const { signOut } = useAuthContext();
  useEffect(() => {
    api
      .get('/me')
      .then(response => {})
      .catch(() => {
        signOut();
      });
  }, [signOut]);

  return (
    <Can roles={['administrator', 'editor']}>
      <h1>Dashboard </h1>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </Can>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  const apiCliente = setupAPIClient(ctx);

  await apiCliente.get('/me');

  return {
    props: {},
  };
});

/*

  users.set('joao@email.com', {
    password: '123456',
    permissions: ['users.list', 'users.create', 'metrics.list'],
    roles: ['administrator']
  })

  users.set('maria@email.com', {
    password: '123456',
    permissions: ['users.list', 'metrics.list'],
    roles: ['editor']
  }) */
