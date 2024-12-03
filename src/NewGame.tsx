import { ReactP5Wrapper } from '@p5-wrapper/react';
import { ColourSelect } from './sketches/ColourSelect';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: ${innerHeight}px;
  gap: 24px;
  padding: 8px;
`;

export const NewGame = () => {
  return (
    <Container>
      <ReactP5Wrapper sketch={ColourSelect} />
    </Container>
  );
};
