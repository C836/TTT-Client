import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";

import { Styled_Logo } from "./Logo_styled";

import { theme } from "../../assets/theme";
const color = theme.colors.light;

interface Props {
  $alt?: boolean;
}

export default function Logo(props:Props) {
  return (
    <Styled_Logo
    $alt={props.$alt}>
      <IconContext.Provider value={{ color: color.dark }}>
        <ImCross />
      </IconContext.Provider>

      <p>
         Tac-T<i>o</i>e
      </p>
    </Styled_Logo>
  );
}
