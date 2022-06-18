import styled from "styled-components";
import { theme } from "../../assets/theme";

const color = theme.colors.light;
const font = theme.fonts;

interface Props {
  alt?: boolean;
}

export const Button = styled.button<Props>`
  width: 100%;
  height: 100%;
  padding: 0.5em;
  margin-top: 0.5em;

  border: none;
  border-radius: 0.3em;
  background: ${(props) => (props.alt ? color.alt_dark : color.dark)};
  color: white;
  font: 600 1.2rem ${font.main};

  display: flex;
  align-items: center;
  justify-content: center;
`;
