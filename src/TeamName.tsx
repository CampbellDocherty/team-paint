import { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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

const Button = styled.button`
  border: none;
  outline: 0.5px solid white;
  cursor: pointer;
  background-color: transparent;
  color: white;
  font-size: 18px;
  font-family: 'Inconsolata';
  padding: 4px;
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
    navigate('/training');
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
