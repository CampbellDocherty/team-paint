import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${innerHeight}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
`;

export const Title = styled.h1`
  font-family: 'Inconsolata';
  font-size: 24px;
`;
export const Button = styled.button`
  border: none;
  outline: 0.5px solid white;
  cursor: pointer;
  background-color: transparent;
  color: white;
  font-size: 18px;
  font-family: 'Inconsolata';
  padding: 4px;
  min-width: 200px;
`;
