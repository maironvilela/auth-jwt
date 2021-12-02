import styled from 'styled-components';
import { media } from '../../styles/media';

export const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.title_header};
  font-weight: 600;

  @media (max-width: ${media('desktop')}) {
  }

  @media (max-width: ${media('tablet')}) {
  }

  @media (max-width: ${media('smartphone')}) {
  }
`;
