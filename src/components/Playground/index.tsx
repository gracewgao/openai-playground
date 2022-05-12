import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
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

const Playground: React.FC = () => {
  const [prompt, setPrompt] = useState("");

  const empty: CardProps[] = [];
  const [list, setList] = useState(empty);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
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
      });
  };

  const StyledButton = styled.button`
    background-color: rgba(0, 128, 96, 1);
    color: white;
    outline: none;
    font-family: inherit;
    padding: 0.375rem 0.75rem;
    font-size: 14px;
    font-weight: 500;
    min-width: 150px;
    width: auto;
    border: none;
    width: 100%;

    &:hover {
      background-color: rgba(0, 110, 82, 1);
    }
  `;

  return (
    <>
      <Spacer height={48} />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <StyledInput
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="hit [tab] for ideas"
            />
          </Col>
          <Col md={4}>
            <StyledButton type="submit">Submit</StyledButton>
          </Col>
        </Row>
      </Form>
      <Spacer height={32} />
      {list.map((item: CardProps) => (
        <>
          <ResponseCard {...item} />
          <Spacer height={16} />
        </>
      ))}
    </>
  );
};

export default Playground;
