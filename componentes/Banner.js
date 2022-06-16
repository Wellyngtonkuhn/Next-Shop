import Image from 'next/image'



import styled from "styled-components"
import { container } from "../styles/utils"



export default function Banner({ src, width, height, alt }){

    return(
        <>
            
            <BannerContainer>
            <Image src={src} width={width} height={height} alt={alt}/>
            </BannerContainer>
        
        </>
    )
}


const BannerContainer = styled.section`
    ${container};
    border-top: 3px solid ${({theme})=> theme.colors.primary};
    border-bottom: 3px solid ${({theme})=> theme.colors.primary};
`

