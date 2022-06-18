import styled from "styled-components";
import { theme } from "../../assets/theme";

const color = theme.colors.light;
const hover = theme.colors.hover;
const font = theme.fonts;

interface Props {
  alt?: string | undefined;
}

export const Button = styled.button<Props>`
  width: 100%;
  height: 100%;
  padding: 0.5em;
  margin-top: 0.5em;

  border: none;
  border-radius: 0.3em;
  background: ${(props) => (props.alt ? color.alt : color.dark)};
  transition: .2s;
  color: white;
  font: 600 1.2rem ${font.main};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    background: ${(props) => (props.alt ? hover.alt : hover.main)};
  }
`;
