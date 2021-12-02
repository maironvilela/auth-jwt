/* eslint-disable no-use-before-define */
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { Container } from './styles';
import { IconBaseProps } from 'react-icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, icon: Icon, ...rest }: InputProps, ref) => (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} ref={ref} id={name} name={name} />
    </Container>
  );

export const Input = forwardRef(InputBase);
