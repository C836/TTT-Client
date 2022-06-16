import styled from "styled-components"

interface Props {
    disabled: boolean
}

export const Grid_Styled = styled.section<Props>`
width: 100%;
max-width: 300px;
background-color: white;

display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);

pointer-events: ${({disabled}) => disabled ? "none" : "all"};
opacity: ${({disabled}) => disabled ? "0.6" : "1"};
`