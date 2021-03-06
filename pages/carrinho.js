import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { CarrinhoContext } from "../context/CarrinhoContext.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import { container } from "../styles/utils";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Carrinho() {
  const {
    getProdutos,
    deletarProduto,
    valorTotalProduto,
    valorTotal,
    freteValor,
    limparStorage,
  } = useContext(CarrinhoContext);

  const [produtos, setProdutos] = useState([]);
  const [recarregar, setRecarregar] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const values = getProdutos();
    setProdutos(values);
  }, [recarregar]);

  const deletar = (id) => {
    toast.success("Produto Removido do Carrinho", {
      position: "bottom-right",
      autoClose: 3000,
    });
    deletarProduto(id);
    setRecarregar((oldValue) => oldValue + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const api = "https://api-teste-123.herokuapp.com";
    const token = await getTokenLogin(api, email, password);
    if (!token) {
      toast.error("Login inválido", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const produtosId = [];
    produtos.map((produto) => produtosId.push(produto._id));
    const venda = await venderProduto(api, token, produtosId);
    if (!venda) {
      toast.error("Compra inválido", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
   toast.success("Compra Finalizada com Sucesso", {
      position: "bottom-right",
      autoClose: 3000,
    });
    limparStorage();
    router.push("/conclusao");
  };

  const getTokenLogin = async (api, email, token) => {
    const result = await fetch(`${api}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });
    if (result.status !== 200) {
      return null;
    }
    const { token } = await result.json();
    return token;
  };

  const venderProduto = async (api, token, produtos) => {
    const result = await fetch(`${api}/produtos/vendas`, {
      method: "POST",
      body: JSON.stringify({ produtos }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status !== 200) {
      return null;
    }
    return "sucess";
  };

  return produtos && produtos.length > 0 ? (
    <>
      <Main>
        <Title>Seu Carrinho</Title>
        <SubTitle>Produtos</SubTitle>
        <ShoppingCartContainer>
          <ShoppingCartProducts>
            <Separator></Separator>
            {produtos &&
              produtos.map((produto, index) => (
                <div key={index}>
                  <ButtonContainer>
                    <button onClick={() => deletar(produto._id)}>
                      <DeleteIcon icon={faX}></DeleteIcon>
                    </button>
                  </ButtonContainer>
                  <Product>
                    <Image
                      src={produto.image}
                      width={200}
                      height={200}
                      alt={produto.nome}
                    />
                    <ProductName>{produto.nome}</ProductName>
                    <ProductPrice>{produto.formattedPrice}</ProductPrice>
                  </Product>
                  <Separator></Separator>
                </div>
              ))}
          </ShoppingCartProducts>
          <section>
            <ShoppingCartPayment>
              <PaymentTitle>1. Resumo do pedido</PaymentTitle>
              <PaymentValue>
                <span>{produtos.length} Produtos</span>{" "}
                <span>{valorTotalProduto()}</span>
              </PaymentValue>
              <PaymentShipping>
                <span>Frete</span> <span>{freteValor()}</span>
              </PaymentShipping>
              <PaymentTotal>
                <span>Total</span> <span>{valorTotal()}</span>
              </PaymentTotal>
              <Separator></Separator>
              <LoginTitle>2. Login</LoginTitle>
              <InputGroup>
                <span>E-MAIL:</span>
                <input
                  type="text"
                  value={email || ""}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </InputGroup>
              <InputGroup>
                <span>SENHA:</span>
                <input
                  type="password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </InputGroup>
              <Button type="submit" onClick={handleSubmit}>
                Entrar
              </Button>
            </ShoppingCartPayment>
          </section>
        </ShoppingCartContainer>
      </Main>

      <ToastContainer />
    </>
  ) : (
    <>
      <Main>
        <Title>Sem Produto</Title>
      </Main>
    </>
  );
}

const Main = styled.main`
  ${container};
  min-height: 589px;
`;
const Title = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 5.625rem 0;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const ShoppingCartContainer = styled.div`
  display: grid;
  grid-template-columns: 780px auto;
  gap: 1.5rem;
  min-height: 800px;
`;

const ShoppingCartProducts = styled.section``;

const Separator = styled.hr`
  border: 1px solid #c8c9c3;
  border-radius: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.8rem 0;
  button {
    border: unset;
    background: unset;
    cursor: pointer;
  }
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: auto 350px auto;
`;

const ProductName = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  padding: 0;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0;
  margin: 0;
  place-self: start end;
`;

const ShoppingCartPayment = styled.div`
  background-color: #f0f1ef;
  border-radius: 4px;
  padding: 1rem;
`;

const PaymentTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
`;

const PaymentValue = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;
  span {
    display: block;
  }
`;

const PaymentShipping = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  span {
    display: block;
  }
`;

const PaymentTotal = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 3.125rem 0 5rem 0;
  display: flex;
  justify-content: space-between;
  span {
    display: block;
  }
`;

const LoginTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 2rem 0;
`;

const InputGroup = styled.div`
  span {
    text-transform: uppercase;
    margin-bottom: 0.625rem;
    display: block;
  }
  input {
    width: 100%;
    height: 1.25rem;
    border: unset;
  }
  margin-bottom: 1.3rem;
`;

const Button = styled.button`
  display: block;
  border: unset;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 auto;
  width: 240px;
  height: 60px;
`;
