import styled from "styled-components";
import { ReactComponent as UnstyledLogo } from "./icons/fiveLogo.svg";

const StyledAppHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  @media (${({ theme }) => theme.breakpoint}) {
    margin: 8px 0;
    padding: 4px 0;
  }
`;

const Logo = styled(UnstyledLogo)`
  height: 32px;
  width: 32px;
  margin-right: 16px;
  @media (${({ theme }) => theme.breakpoint}) {
    height: 24px;
    width: 24px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor.title};
  @media (${({ theme }) => theme.breakpoint}) {
    font-size: 18px;
    display: none;
  }
`;

export function AppHeader() {
  return (
    <StyledAppHeader>
      <Logo />
      <Title>This sentence has five words.</Title>
    </StyledAppHeader>
  );
}
