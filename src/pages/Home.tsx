import { Link } from 'react-router';
import { styled } from 'styled-components';
import play from '../assets/play.svg';
import { Container, Title } from './styles';
import { useGetImages } from './useGetTeams';

const PlayButton = styled.button`
  margin-top: 24px;
  width: 60px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin: 0px 16px;
  margin-top: 56px;
`;

const TeamName = styled.p`
  font-family: Inconsolata;
  margin: 0;
  font-size: 20px;
`;

const Home = () => {
  const { teams } = useGetImages();

  return (
    <Container>
      <Title>Team Paint</Title>
      <PlayButton>
        <Link to="/name">
          <img style={{ width: '100%' }} src={play} alt="Play button" />
        </Link>
      </PlayButton>
      {teams &&
        teams.map((team) => {
          const key = Object.keys(team)[0];
          const images = team[key];
          const teamName = images[0].metadata.customMetadata?.['teamName'];
          return (
            <TeamContainer key={key}>
              <TeamName>{teamName}</TeamName>
              {images.map((image) => {
                return (
                  <img
                    style={{ width: '30%', maxWidth: '300px' }}
                    key={image.downloadUrl}
                    src={image.downloadUrl}
                    alt={image.metadata.fullPath.split('/')[-1]}
                  />
                );
              })}
            </TeamContainer>
          );
        })}
    </Container>
  );
};

export default Home;
