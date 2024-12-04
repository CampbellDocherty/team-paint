import { ReactP5Wrapper } from '@p5-wrapper/react';
import { styled } from 'styled-components';
import { ColourSelect } from '../sketches/ColourSelect';
import { Container, Title, Button } from './styles';
import { useNavigate } from 'react-router';

const SketchWrapper = styled.div`
  margin: 30px 0px;
`;

export const Casual = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Casual</Title>
      <SketchWrapper>
        <ReactP5Wrapper sketch={ColourSelect} />
      </SketchWrapper>
      <Button className="save-image">Save</Button>
      <Button
        onClick={() => navigate('/')}
        style={{ display: 'none' }}
        className="done"
      >
        Done
      </Button>
    </Container>
  );
};
