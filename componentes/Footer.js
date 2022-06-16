import styled from "styled-components";
import { container } from "../styles/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Image from "next/image";

import Logo from "../public/imagens/logo.png";

export default function Footer() {
  return (
    <>
      <StyledFooter>
        <FooterContainer>
          <div>
            <Image src={Logo} width={130} height={60} alt={"PokeNext"} />
          </div>
          <Contato>
            Imagine Shop - +55 (48) 3771 - 1703 3771 - 1823
            imagine@imagineschool.com.br - Rua Miguel Daux, 129 - Coqueiro -
            Florianópolis/SC
          </Contato>
          <IconesSociaisLista>
            <li>
              <IconesSociais icon={faFacebookSquare} />
            </li>
            <li>
              <IconesSociais icon={faInstagram} />
            </li>
            <li>
              <IconesSociais icon={faYoutube} />
            </li>
          </IconesSociaisLista>
        </FooterContainer>
      </StyledFooter>
    </>
  );
}

const StyledFooter = styled.footer`
  height: 12.5rem;
  background-color: #f4f4f4;
`;

const FooterContainer = styled.div`
  ${container};
  display: grid;
  grid-template-columns: 130px auto 130px;
  padding-top: 2.5rem;
`;

const Contato = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  text-align: center;
  margin-top: 8.125rem;
`;

const IconesSociaisLista = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
`;

const IconesSociais = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;
`;
