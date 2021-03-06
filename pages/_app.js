import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import CarrinhoContextProvider from "../context/CarrinhoContext"
import Layout from "../componentes/Layout";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  :root {
    font-size: 16px;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #fff;
    font-family: 'Montserrat', sans-serif;
  }
`;
const theme = {
  colors: {
    primary: "#f73f01",
    secondary: "#777",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CarrinhoContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CarrinhoContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
