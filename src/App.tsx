import { styled } from 'styled-components';

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
    </Container>
  );
};

export default App;
