import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #fff;
  width: 100vw;
`;

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  background: #f0f2f5;
  margin-top: -50px;
  border-radius: 20px;
  height: 22rem;

  div {
    & + div {
      margin-top: 1rem;
    }
  }

  button {
    margin-top: 1rem;
  }
`;
