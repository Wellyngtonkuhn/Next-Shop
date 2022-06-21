import { useContext, useEffect } from "react"



export default function Carrinho(){

    const { getProdutos } = useContext(CarrinhoContext)

        useEffect((_ => {
            const produtos = getProdutos()
            console.log(produtos)
        }), [])

    return(
        <>

        </>
    )
}