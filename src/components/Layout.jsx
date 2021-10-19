import styled from "styled-components";
import { transparentize } from "polished";

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppHeader = styled.div`
  max-width: 960px;
  margin: 16px 0;
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  align-self: flex-end;
  height: 48px;
  background: white;
  font-size: 14px;
  position: fixed;
  bottom: 0px;
  & span {
    opacity: 0.6;
  }
  & a {
    color: unset;
  }
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 2.5fr 3fr 3.5fr 4fr 4.5fr 5fr;
  grid-column-gap: 4px;
  width: 200px;
`;

const Key = styled.div`
  background: red;
  height: 8px;
  border-radius: 2px;
  background: ${({ syllables }) =>
    transparentize(0.5, getBackgroundColor(syllables))};
`;

function getBackgroundColor(syllables) {
  if (syllables < 1) {
    return "white";
  } else if (syllables < 5) {
    return "#FFCA3A";
  } else if (syllables < 11) {
    return "#FF730A";
  } else if (syllables < 21) {
    return "#FF595E";
  } else if (syllables < 31) {
    return "#D44894";
  } else if (syllables < 41) {
    return "#9065CA";
  } else if (syllables < 51) {
    return "#15B674";
  } else if (syllables < 71) {
    return "#8AC926";
  } else if (syllables < 91) {
    return "#1982C4";
  } else {
    return "#1350AC";
  }
}

export function Layout({ children }) {
  return (
    <PageContainer>
      <AppHeader>
        <h1>This sentence has five words...</h1>
      </AppHeader>
      {children}
      <Footer>
        <span>
          Site by <a href="https://twitter.com/JLampron">lamp</a>
        </span>
        <Legend>
          <Key syllables={4} />
          <Key syllables={10} />
          <Key syllables={20} />
          <Key syllables={30} />
          <Key syllables={40} />
          <Key syllables={50} />
          <Key syllables={70} />
          <Key syllables={90} />
          <Key syllables={100} />
        </Legend>
        <span>
          Inspired by{" "}
          <a href="https://i1.wp.com/www.aerogrammestudio.com/wp-content/uploads/2014/08/this-sentence-has-five-works.jpg?w=640&ssl=1">
            this image
          </a>
        </span>
      </Footer>
    </PageContainer>
  );
}
