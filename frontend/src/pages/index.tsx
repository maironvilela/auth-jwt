/* eslint-disable no-unused-vars */
import { FormEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiUser, FiLock } from 'react-icons/fi';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Container, Content } from '../components/Home/styles';
import { useAuthContext } from '../hooks/useAuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

interface IAuthenticationFormData {
  login: string;
  password: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin: SubmitHandler<IAuthenticationFormData> = async (
    data,
    event: FormEvent,
  ) => {
    event.preventDefault();
    await signIn(data);
  };

  return (
    <>
      <Header />

      <Container>
        <Content onSubmit={handleSubmit(handleLogin)}>
          <Input
            placeholder="Login"
            name="login"
            icon={FiUser}
            {...register('login')}
          />
          <Input
            placeholder="Password"
            name="password"
            icon={FiLock}
            type="password"
            {...register('password')}
          />

          <Button label="Entrar" isLoading={isLoading} type="submit" />
        </Content>
      </Container>
    </>
  );
}

/*

export const getServerSideProps = withSSRGuest<{
  users: string[];
}>(async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      users: [],
    },
  };
}); */
