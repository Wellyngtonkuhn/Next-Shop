import styled from "styled-components";

import Banner from "../componentes/Banner";
import Produto from "../componentes/Produtos";

import banner from "../public/imagens/BANNER01.png";

export const getServerSideProps = async () => {
  const api = "https://api-teste-123.herokuapp.com";
  const res = await fetch(`${api}/produtos`);
  const data = await res.json();

  data.forEach((produto) => {
    produto.image = `${api}/uploads/${produto.fileName}`;
    produto.formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(produto.valor);
    produto.precoDividido = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(produto.valor / 10);
  });
  return {
    props: {
      produtos: data,
    },
  };
};

export default function Home({ produtos }) {
  return (
    <>
      <Main>
        <Banner src={banner} width={1140} height={325} alt={"Banner"} />
        <Produto produtos={produtos} />
      </Main>
    </>
  );
}

const Main = styled.main`
  min-height: 62vh;
`;
