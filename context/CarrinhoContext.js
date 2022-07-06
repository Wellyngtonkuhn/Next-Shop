import { createContext } from "react";

export const CarrinhoContext = createContext({});

export default function CarrinhoContextProvider({ children }) {
  const isBrowser = typeof window !== "undefined";
  const SESSSION_STORAGE = "produtos";
  const Frete = 100

  const addProdutos = (produto) => {
    const produtos = getProdutos();
    const findProdutos = produtos.find(prod => prod._id === produto._id)
    if(findProdutos) return
    produtos.push(produto);
    if (isBrowser) {
      sessionStorage.setItem(SESSSION_STORAGE, JSON.stringify(produtos));
    }
  };

  const getProdutos = () => {
    if (isBrowser) {
      const produtos = sessionStorage.getItem(SESSSION_STORAGE);
      return produtos ? JSON.parse(produtos) : [];
    }
    return [];
  };

  const deletarProduto = (id) => {
    const produtos = getProdutos()
    const newProduto = produtos.filter(produto => produto._id !== id)
    if (isBrowser) {
      sessionStorage.setItem(SESSSION_STORAGE, JSON.stringify(newProduto));
    }
  }

  const valorTotalProduto = () => {
    const produtos = getProdutos()
    const total = produtos.reduce((sum, cur) => sum + cur.valor, 0)
    return (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })).format(total)
  }

  const valorTotal = () => {
    const produtos = getProdutos()
    const total = produtos.reduce((sum, cur) => sum + cur.valor, 0)
    return (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })).format(total + Frete)
  }

  const freteValor = () => {
    return (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })).format(Frete);
  }

  return (
    <>
      <CarrinhoContext.Provider value={{ addProdutos, getProdutos, deletarProduto, valorTotalProduto, valorTotal, freteValor }}>
        {children}
      </CarrinhoContext.Provider>
    </>
  );
}
