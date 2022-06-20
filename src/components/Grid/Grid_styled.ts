import styled from "styled-components"

interface Props {
    disabled: boolean
}

export const Grid_Styled = styled.section<Props>`
width: 400px;
max-width: 95%;

position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
gap: 10px;

pointer-events: ${({disabled}) => disabled ? "none" : "all"};
opacity: ${({disabled}) => disabled ? "0.6" : "1"};
`