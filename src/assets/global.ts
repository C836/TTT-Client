import { createGlobalStyle } from "styled-components";

import background from "./images/background.png";
import { theme } from "./theme";

const color = theme.colors.light;

export const Global = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: url(${background}) center repeat, ${color.main};
        background-size: 150px;
    }

    @keyframes disable {
        from {
            position: static;
        } to {
            position: absolute;
        }
    }
`;
