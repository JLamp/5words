import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";
import { transparentize } from "polished";

const GlobalStyle = createGlobalStyle`
button {
  all: unset;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

textarea {
  border: none;
  overflow: auto;
  outline: none;
  
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  
  resize: none; /*remove the resize handle on the bottom right*/
}
`;

const GlobalContainer = styled.div`
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  max-width: 960px;
  justify-content: center;
  margin: 0 24px;
`;

const lightTheme = {
  background: "white",
  textColor: {
    output: "black",
    title: transparentize(0.2, "black"),
    light: transparentize(0.45, "black"),
  },
  size: {
    s4: "#FFECC0",
    s10: "#FFD0B4",
    s20: "#FFC7C8",
    s30: "#F2C1DA",
    s40: "#D9C9ED",
    s50: "#BAE7CE",
    s70: "#D7ECBA",
    s90: "#B7D4EB",
    sX: "#B0C2E3",
  },
};

// const darkTheme = {
//   background: "#121212",
//   textColor: {
//     output: "#fff",
//     title: transparentize(0.2, "#fff"),
//     light: transparentize(0.5, "#fff"),
//   },
// };

export function Layout({ children }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <GlobalContainer>
        <PageContainer>
          <AppHeader />
          {children}
          <Footer />
        </PageContainer>
      </GlobalContainer>
    </ThemeProvider>
  );
}
