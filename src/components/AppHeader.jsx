import styled from "styled-components";
import { ReactComponent as UnstyledLogo } from "./icons/fiveLogo.svg";

const StyledAppHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  height: 64px;
  justify-content: center;
`;

const Logo = styled(UnstyledLogo)`
  height: 32px;
  width: 32px;
  margin-right: 16px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export function AppHeader() {
  return (
    <StyledAppHeader>
      <Logo />
      <Title>This sentence has five words.</Title>
    </StyledAppHeader>
  );
}
