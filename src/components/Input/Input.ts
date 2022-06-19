import styled from "styled-components";
import { theme } from "../../assets/theme";

const font = theme.fonts;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5em;

  border: .1em solid gray;
  border-radius: 0.3em;
  margin-bottom: 0.3em;
  font: 600 1.1rem ${font.main};

  display: flex;
  align-items: center;
  justify-content: center;

  &:invalid:focus {
    border: .1em solid transparent;
    outline: .1em solid red;
  }
`;
