import styled from "styled-components";

import { theme } from "../../assets/theme";

const color = theme.colors.light

export const Styled_Menu = styled.section`
  width: 300px;
  padding: 1em;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0 0 40px #11111170;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;