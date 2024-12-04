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

const Button = styled.button`
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

export const Casual = () => {
  return (
    <Container>
      <Title>Casual</Title>
      <SketchWrapper>
        <ReactP5Wrapper sketch={ColourSelect} />
      </SketchWrapper>
      <Button className="save-image">Save</Button>
    </Container>
  );
};
