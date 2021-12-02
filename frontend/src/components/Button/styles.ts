import styled from 'styled-components';

export const Container = styled.button`
  background: ${({ theme }) => theme.colors.button};
  color: #fff;
  border: 2px solid #fff;
  padding: 1rem;
  width: 14rem;
  border-radius: 9999px;
  transition: 0.5s;

  &:hover {
    filter: brightness(0.8);
  }
`;
