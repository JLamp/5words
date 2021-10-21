import styled from "styled-components";
import { Sizes } from "../helpers/getValues";

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  align-self: flex-end;
  height: 48px;
  background: ${({ theme }) => theme.background};
  font-size: 14px;
  & a {
    color: unset;
  }
`;

const FooterLink = styled.span`
  color: ${({ theme }) => theme.textColor.light};
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
  background: ${({ theme, size }) => theme.size[size]};
`;

export function Footer() {
  return (
    <StyledFooter>
      <FooterLink>
        Site by <a href="https://twitter.com/JLampron">lamp</a>
      </FooterLink>
      <Legend>
        {Sizes.map((size) => (
          <Key size={size.size} />
        ))}
      </Legend>
      <FooterLink>
        Inspired by{" "}
        <a href="https://i1.wp.com/www.aerogrammestudio.com/wp-content/uploads/2014/08/this-sentence-has-five-works.jpg?w=640&ssl=1">
          this image
        </a>
      </FooterLink>
    </StyledFooter>
  );
}
