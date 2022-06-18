import styled from "styled-components";

import { theme } from "../../assets/theme";

const font = theme.fonts;

export const Styled_Logo = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: .5em;
  font: 800 2.3rem ${font.main};

  & p{
    font-size: 2.7rem;
  }
`;
