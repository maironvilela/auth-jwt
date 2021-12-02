import { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => <h1>Teste</h1>;

export default AppProvider;
