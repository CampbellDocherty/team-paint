import { Link } from 'react-router';
import { styled } from 'styled-components';
import play from '../assets/play.svg';
import { Container, Title } from './styles';

const PlayButton = styled.button`
  margin-top: 24px;
  width: 60px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const Home = () => {
  return (
    <Container>
      <Title>Team Paint</Title>
      <PlayButton>
        <Link to="/name">
          <img style={{ width: '100%' }} src={play} alt="Play button" />
        </Link>
      </PlayButton>
    </Container>
  );
};

export default Home;
