import styled from "styled-components";

import { theme } from "../../assets/theme";

const font = theme.fonts;
const color = theme.colors.light;

interface Props {
  $alt?: boolean;
}

export const Styled_Logo = styled.figure<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.darker};
  margin-bottom: ${props => props.$alt ? "30px" : ""};

  font: 800 2.3rem ${font.main};

  & p {
    font-size: 2.7rem;
  }

  & i {
    font-style: normal;
    color: ${color.dark};
  }
`;
