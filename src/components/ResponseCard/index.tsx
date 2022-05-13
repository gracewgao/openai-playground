import React from "react";
import styled from "styled-components";

export interface CardProps {
  request: string;
  response: string;
}

const Card = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(23, 24, 24, 0.05), 0 1px 2px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 24px;
`;

const Prompt = styled.p`
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const Response = styled.p`
  line-height: 1.55;
  color: rgba(32, 34, 35, 1);
  margin-bottom: 0.5em;
`;

const ResponseCard = (props: CardProps) => {
  return (
    <Card>
      <Prompt>{props.request}</Prompt>
      <Response>{props.response}</Response>
    </Card>
  );
};

export default ResponseCard;
