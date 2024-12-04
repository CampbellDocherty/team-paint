import { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Button, Container, Title } from './styles';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 200px;
  margin: auto 0;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid white;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 20px;
  font-family: 'Inconsolata';
  text-align: center;
`;

type FormData = {
  teamName: string;
};

export const TeamName = () => {
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries()) as FormData;
    const uuid = uuidv4();
    localStorage.setItem('teamName', formJson.teamName);
    localStorage.setItem('teamId', uuid);
    navigate('/casual');
  };

  return (
    <Container>
      <Title>Team Name</Title>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Input type="text" name="teamName" id="teamName" required />
        <Button type="submit">Enter</Button>
      </Form>
    </Container>
  );
};
