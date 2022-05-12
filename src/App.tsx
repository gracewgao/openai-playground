import React from "react";
import { Container } from "react-bootstrap";
import Playground from "./components/Playground";
import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;

  font-family: San Francisco, Roboto;
  font-weight: 300;
  background-color: rgba(246, 246, 247, 1);
`;

const ThinContainer = styled(Container)`
  max-width: 600px;
`;

function App() {
  return (
    <Page>
      <ThinContainer>
        <Playground />
      </ThinContainer>
    </Page>
  );
}

export default App;
