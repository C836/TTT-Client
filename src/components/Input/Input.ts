import styled from "styled-components";
import { theme } from "../../assets/theme";

const font = theme.fonts

export const Input = styled.input`
width: 100%;
height: 100%;
padding: .5em;

border: .1rem solid gray;
border-radius: .3em;
margin-bottom: .3em;
font: 600 1rem ${font.main};

display: flex;
align-items: center;
justify-content: center;
`