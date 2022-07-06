import { createContext } from "react";

export const CarrinhoContext = createContext({});

export default function CarrinhoContextProvider({ children }) {
  const isBrowser = typeof window !== "undefined";
  const SESSSION_STORAGE = "produtos";

  const addProdutos = (produto) => {
    const produtos = getProdutos();
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

  return (
    <>
      <CarrinhoContext.Provider value={{ addProdutos, getProdutos }}>
        {children}
      </CarrinhoContext.Provider>
    </>
  );
}
