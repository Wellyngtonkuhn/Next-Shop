import { useContext, useEffect } from "react"

import { CarrinhoContext } from "../context/CarrinhoContext.js"

export default function Carrinho(){

    const { getProdutos } = useContext(CarrinhoContext)

        useEffect(() => {
            const produtos = getProdutos()
            console.log(produtos)
        }, [])

    return(
        <>

        </>
    )
}