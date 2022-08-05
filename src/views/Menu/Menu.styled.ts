import styled from "styled-components";

import { theme } from "../../assets/theme";

const color = theme.colors.light;
const font = theme.fonts;

export const Menu = styled.section<{ disabled?: boolean }>`
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

  transition: opacity 0.2s;

  opacity: ${({ disabled }) => (disabled ? "0" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};

  .status {
    margin: 0.5em;
    text-align: center;

    color: ${color.black};
    font: 700 1rem ${font.main};
  }

  .room {
    margin: 0.79em;
    text-align: center;
    font: 600 1.2rem ${font.main};
  }
`;
