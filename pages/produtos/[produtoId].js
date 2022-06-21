import styled from "styled-components";
import Image from "next/image";
import Banner from "../../componentes/Banner";
import { container } from "../../styles/utils";

import banner from "../../public/imagens/BANNER02.png";

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.produtoId;
  const api = "https://api-teste-123.herokuapp.com";
  const res = await fetch(`${api}/produtos/${id}`);
  const data = await res.json();

  data.image = `${api}/uploads/${data.fileName}`;
  data.formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(data.valor);
  data.precoDividido = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(data.valor / 10);

  return {
    props: {
      produto: data,
    },
  };
};

export default function ProdutosId({ produto }) {
  return (
    <>
      <ProdutoContainer>
        <Banner src={banner} width={1140} height={145} alt={"Banner"} />
        <ProdutoDetalhe>
          <ImagemContainer>
            <Image
              src={produto.image}
              width={200}
              height={200}
              alt={produto.nome}
            />
          </ImagemContainer>

          <div>
            <ProdutoNome>{produto.nome}</ProdutoNome>
            <ProdutoValor>{produto.formattedPrice}</ProdutoValor>
            <Produtodivisao>
              10x de {produto.precoDividido} sem juros
            </Produtodivisao>

            <Button>Adicionar ao carrinho</Button>
            <PrudutoDescrição>{produto.descricao}</PrudutoDescrição>
          </div>
        </ProdutoDetalhe>

        <ProdutoSumarioTitle>
          <span>Inf</span>ormações do produto
        </ProdutoSumarioTitle>

        <Sumario>{produto.sumario}</Sumario>
      </ProdutoContainer>
    </>
  );
}

const ProdutoContainer = styled.main`
  ${container};
`;

const ProdutoDetalhe = styled.div`
  display: grid;
  grid-template-columns: 31.25rem auto;
  gap: 1rem;
  margin: 3.125rem 0;
`;
const ImagemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 4px;
`;

const ProdutoNome = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
`;

const ProdutoValor = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.125rem;
  font-weight: 700;
  margin: 0;
  margin-top: 2.8125rem;
`;

const Produtodivisao = styled.small`
  font-size: 0.875rem;
  color: #999;
`;

const Button = styled.button`
  display: block;
  border: unset;
  border-radius: 4px;
  width: 290px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  margin: 2.25rem 0;
`;

const PrudutoDescrição = styled.p`
  font-size: 0.875rem;
`;

const ProdutoSumarioTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 2.8rem;
  span {
    text-decoration: underline ${({ theme }) => theme.colors.primary};
  }
`;
const Sumario = styled.div`
  min-height: 800px;
`;
