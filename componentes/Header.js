import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import Logo from "../public/imagens/logo.png";
import Carinho from "../public/imagens/carrinho.png";

import { container } from "../styles/utils";

export default function Header() {
  return (
    <>
      <StyledHeader>
        <NavBar>
          <Image src={Logo} width={200} height={100} alt="Logo" />
          <MenuList>
            <MenuItem>
              <Link href={"/"}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link href={"/"}>Sobre</Link>
            </MenuItem>
            <MenuItem>
              <Link href={"/carinho"}>
                  <a>
                  <Image src={Carinho} width={52} height={52} alt="carinho de compras" />
                  </a>
              </Link>
            </MenuItem>
          </MenuList>
        </NavBar>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
    margin: 1.87rem 0 3.125rem 0;
`;

const NavBar = styled.nav`
  ${container}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 2.5rem;
    align-items: center;
`;

const MenuItem = styled.li`
    font-size: 16px;
    font-weight: 700;
    a{
        text-decoration: none;
        color: #000;
        transition: 0.3s all ease;
    }
    a:hover{
        color: ${({theme})=> theme.colors.primary};
    }
`;
