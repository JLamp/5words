import styled from "styled-components";
import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  justify-content: center;
  max-width: 960px;
  margin: 0 auto;
`;

export function Layout({ children }) {
  return (
    <PageContainer>
      <AppHeader />
      {children}
      <Footer />
    </PageContainer>
  );
}
