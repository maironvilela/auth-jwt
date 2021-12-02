import styled from 'styled-components';
import { media } from '../../styles/media';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.header};
  width: 100%;
  min-width: 360px;

  height: 20rem;

  @media (max-width: ${media('desktop')}) {
  }

  @media (max-width: ${media('tablet')}) {
  }

  @media (max-width: ${media('smartphone')}) {
  }
`;
