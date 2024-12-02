import { ReactP5Wrapper } from '@p5-wrapper/react';
import { styled } from 'styled-components';
import { ColourSelect } from './sketches/ColourSelect';
import play from './assets/play.svg';
import { Link } from 'react-router';

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

const PlayButton = styled.button`
  margin-top: 24px;
  width: 60px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const App = () => {
  return (
    <Container>
      <Title>Team Paint</Title>
      <PlayButton>
        <Link to="/new">
          <img style={{ width: '100%' }} src={play} alt="Play button" />
        </Link>
      </PlayButton>
      {/* <ReactP5Wrapper sketch={(p5) => ColourSelect(p5, 'green')} /> */}
    </Container>
  );
};

export default App;
