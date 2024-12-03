import { ReactP5Wrapper } from '@p5-wrapper/react';
import { styled } from 'styled-components';
import { ColourSelect } from './sketches/ColourSelect';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${innerHeight}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
`;

const Title = styled.h1`
  font-family: 'Inconsolata';
  font-size: 24px;
`;

const SketchWrapper = styled.div`
  margin: 30px 0px;
`;

export const Round = () => {
  return (
    <Container>
      <Title>Game Time</Title>
      <SketchWrapper>
        <ReactP5Wrapper sketch={ColourSelect} />
      </SketchWrapper>
    </Container>
  );
};
