import React from "react";
import { Container } from "react-bootstrap";
import Playground from "./components/Playground";
import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
  padding: 48px;
`;

function App() {
  return (
    <Page>
      <Container>
        <Playground />
      </Container>
    </Page>
  );
}

export default App;
