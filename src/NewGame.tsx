import { ReactP5Wrapper } from '@p5-wrapper/react';
import { ColourSelect } from './sketches/ColourSelect';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';

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

export const NewGame = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Training</Title>
      <SketchWrapper>
        <ReactP5Wrapper sketch={(p) => ColourSelect(p, true)} />
      </SketchWrapper>
      <Button
        onClick={() => {
          navigate('/game-time');
        }}
      >
        Start
      </Button>
    </Container>
  );
};
