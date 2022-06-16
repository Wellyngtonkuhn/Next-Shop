import Link from "next/link";
import Image from "next/image";

import styled from "styled-components";
import { container } from "../styles/utils";

export default function Produto({ produtos }) {
  return (
    <>
      <ProdutoContainer>
        <Title>
          <span>Des</span>taques
        </Title>
        <ProdutosLista>
          {produtos &&
            produtos.map((produtos) => (
              <ProdutoItem key={produtos._id}>
                <Link href="/">
                  <a>
                    <Image
                      src={produtos.image}
                      width={230}
                      height={230}
                      alt={produtos.nome}
                    />
                    <ProdutoNome>{produtos.nome}</ProdutoNome>
                    <ProdutoValor>{produtos.formattedPrice}</ProdutoValor>
                    <Produtodivisao>
                      10x de {produtos.precoDividido} sem juros
                    </Produtodivisao>
                  </a>
                </Link>
              </ProdutoItem>
            ))}
        </ProdutosLista>
      </ProdutoContainer>
    </>
  );
}

const ProdutoContainer = styled.section`
  ${container};
`;

const Title = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 3.125rem;
  margin-bottom: 2.8rem;
  span {
    text-decoration: underline ${({ theme }) => theme.colors.primary};
  }
`;

const ProdutosLista = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.875rem;
  margin-bottom: 11.25rem;
`;

const ProdutoItem = styled.div`
  border: 1px solid #eaeaea;
  width: 20%;
  height: 23.75rem;
  border-radius: 4px;
  box-shadow: 5px 10px 10px #d9d9d9;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s all ease;
  a {
    text-decoration: none;
    color: #000;
  }

  &:hover {
    box-shadow: 5px 0px 10px #d9d9d9;
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ProdutoNome = styled.p`
  font-size: 0.875rem;
`;

const ProdutoValor = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
`;

const Produtodivisao = styled.small`
  font-size: 0.75rem;
  font-weight: 700;
  color: #999;
`;
