import { Container } from './styles';
import ReactLoading from 'react-loading';
import { InputHTMLAttributes } from 'react';

interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading: boolean;
}

export const Button = ({ label, isLoading, ...rest }: ButtonProps) => {
  return (
    <Container>
      {label}
      {isLoading && (
        <ReactLoading
          type="spokes"
          color="red"
          height={'100%'}
          width={'100%'}
        />
      )}
    </Container>
  );
};
