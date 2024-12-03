import { ReactP5Wrapper } from '@p5-wrapper/react';
import { ColourSelect } from './sketches/ColourSelect';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import flags from './assets/flags.json';

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
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Game Time</Title>
      <SketchWrapper>
        <ReactP5Wrapper sketch={ColourSelect} />
      </SketchWrapper>
    </Container>
  );
};
