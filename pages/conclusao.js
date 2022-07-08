import styled from "styled-components";
import { container } from "../styles/utils";

export default function FinalizandoCompra() {
  return (
    <>
      <Main>
        <h1>Compra Finalizada</h1>
      </Main>
    </>
  );
}

const Main = styled.main`
  ${container};
  min-height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
