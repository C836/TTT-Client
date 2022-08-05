import * as S from "./Menu.styled";

import Logo from "../../components/Logo/Logo";
import { useState } from "react";
import { Join } from "./Join/Join";
import { ServerGameConfig } from "../../types";

export function Menu({ Game, Server }: ServerGameConfig) {
  const { server: {ingame} } = Server;

  const [uiState, setUi] = useState<string | null>(null);

  return (
    <S.Menu>
      <Logo $alt={uiState === "create" || uiState === "ready" ? false : true} />
      <Join
        disabled={ingame}
        uiState={{uiState, setUi}}
        Game={Game} 
        Server={Server} 
      />
    </S.Menu>
  );
}
