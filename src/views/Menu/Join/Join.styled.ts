import styled from "styled-components";

import { theme } from "../../../assets/theme";

const color = theme.colors.light;
const font = theme.fonts;

export const Join = styled.section<{ disabled: boolean }>`
  transition: opacity 0.2s;

  opacity: ${({ disabled }) => (disabled ? "0" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
`;

export const Fieldset = styled.form<{ disabled: boolean }>`
  display: ${({ disabled }) => (disabled ? "none" : "block")};

  .key {
    display: block;
    text-align: center;
    padding-top: 0.4em;

    color: ${color.black};
    font: 700 1.7rem ${font.main};
  }
`;
