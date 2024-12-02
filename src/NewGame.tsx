import { ReactP5Wrapper } from '@p5-wrapper/react';
import { Colour, ColourSelect } from './sketches/ColourSelect';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: ${innerHeight}px;
  gap: 4px;
  padding: 8px;
`;

const colours: Colour[] = ['red', 'green', 'blue'];

export const NewGame = () => {
  return (
    <Container>
      {colours.map((colour) => {
        return (
          <ReactP5Wrapper
            key={colour}
            sketch={(p5) => ColourSelect(p5, colour)}
          />
        );
      })}
    </Container>
  );
};
