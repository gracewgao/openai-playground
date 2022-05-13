import React, { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";
import Spacer from "../Base/Spacer";
import ResponseCard, { CardProps } from "../ResponseCard";

const StyledInput = styled.input`
  background: none;
  font-family: inherit;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
  background-clip: padding-box;
  border: 0.5px solid rgba(32, 34, 35, 0.5);
  color: rgba(32, 34, 35, 1);
  width: 100%;

  :focus {
    outline: none;
    border: 0.5px solid rgba(32, 34, 35, 1);
    color: rgba(32, 34, 35, 1);
  }
`;

const StyledButton = styled.button`
  background-color: rgba(0, 128, 96, 1);
  color: white;
  outline: none;
  font-family: inherit;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 500;
  min-width: 150px;
  border: 0.5px solid rgba(0, 128, 96, 1);
  width: 100%;

  &:hover {
    background-color: rgba(0, 110, 82, 1);
    border: 0.5px solid rgba(0, 110, 82, 1);
  }
`;

const LinkButton = styled.button`
  background-color: transparent;
  color: rgba(32, 34, 35, 1);
  outline: none;
  font-family: inherit;
  padding: 0;
  font-size: 14px;
  font-weight: 300;
  border: none;
  width: auto;
  text-decoration: underline;

  &:hover {
    color: rgba(32, 34, 35, 1);
  }
`;

const Header = styled.h1`
  font-weight: 500;
  text-align: center;
`;

const Playground: React.FC = () => {
  const empty: CardProps[] = [];
  const [prompt, setPrompt] = useState("");
  const [list, setList] = useState(empty);
  const [loading, setLoading] = useState(false);

  const generatePrompt = () => {
    const verbs = ["sing me a song", "write me a poem", "tell me a joke", "perform a dialogue", "tell me a secret"];
    const subjects = ["the robot apocalypse", "love", "geese", "breakfast foods", "cats in space"];
    const random = `${verbs[Math.floor(Math.random() * 5)]} about ${
      subjects[Math.floor(Math.random() * 5)]
    }`;
    setPrompt(random);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
    })
      .then((response: Response) => {
        return response.json();
      })
      .then((data) => {
        const response = data.choices[0].text;
        setList([{ request: prompt, response: response }, ...list]);
        setPrompt("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Spacer height={48} />
      <Header>"AI knows everything"</Header>
      <Spacer height={24} />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <StyledInput
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt"
            />
            <Spacer height={8} />
          </Col>
          <Col md={4}>
            <StyledButton type="submit">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </StyledButton>
            <Spacer height={8} />
          </Col>
        </Row>
      </Form>
      <LinkButton onClick={generatePrompt}>Generate random prompt</LinkButton>
      <Spacer height={24} />
      {list.map((item: CardProps) => (
        <>
          <ResponseCard {...item} />
          <Spacer height={16} />
        </>
      ))}
      <Spacer height={48} />
    </>
  );
};

export default Playground;
