import styled from "styled-components"

export const Container = styled.section`
width: 100%;
max-width: 300px;
background-color: white;

display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
`