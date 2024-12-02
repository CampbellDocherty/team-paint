import { ReactP5Wrapper } from '@p5-wrapper/react';
import { styled } from 'styled-components';
import { ColourSelect } from './sketches/ColourSelect';

const Container = styled.div`
  width: 100%;
  height: ${innerHeight}px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: 'Inconsolata';
  font-size: 20px;
`;

const App = () => {
  return (
    <Container>
      <Title>Team Paint</Title>
      <ReactP5Wrapper sketch={(p5) => ColourSelect(p5, 'green')} />
    </Container>
  );
};

export default App;
