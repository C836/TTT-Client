import { Container_Menu, Styled_Menu } from "./Menu_styled";
import { socket } from "../../App";

import { IconContext } from "react-icons";
import { HiPlus } from "react-icons/hi";
import { TbDoorEnter } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { RiCheckFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";

import { Room_Socket } from "../../services/actions/rooms";
import { Game_Socket } from "../../services/actions/game";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import Logo from "../Logo/Logo";
import { useState } from "react";
import useTransition from "react-transition-state";

interface Props {
  Game: {
    game: Game_Config;
    setGame: Function;
  };
  Server: {
    server: Server_Config;
    setServer: Function;
  };
}

export default function Menu({ Game, Server }: Props) {
  const { game, setGame } = Game;
  const { username } = game;

  const { server, setServer } = Server;
  const { room, key, status } = server;

  const new_Room = new Room_Socket({ socket, username, room });
  const new_Game = new Game_Socket({ socket, username, room });

  const change_username = (event: React.ChangeEvent<HTMLInputElement>) => {
    const new_username = event.target.value;
    setGame({ ...game, username: new_username });
  };

  const change_room = (event: React.ChangeEvent<HTMLInputElement>) => {
    const new_room = event.target.value;
    setServer({ ...server, room: new_room });
  };

  const create_room = (event: any) => {
    if (!username) return;

    event.preventDefault();
    setUi("create");
    new_Room.create_room();
  };

  const join_menu = (event: any) => {
    if (!username) return;

    event.preventDefault();
    setUi("join");
  };

  const join_room = () => {
    setUi("ready");
    new_Room.join_room();
  };

  const choose_player = () => {
    new_Game.choose_player();
  };

  const back = (event: any) => {
    event.preventDefault()
    
    setUi(null);
  };

  const [uiState, setUi] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Styled_Menu>
        <Logo
          $alt={uiState === "create" || uiState === "ready" ? false : true}
        />
        <Container_Menu $disabled={uiState !== null ? true : false}>
          <Input
            type={"text"}
            placeholder={"Apelido"}
            onChange={change_username}
            required
          />

          <Button type="submit" onClick={create_room}>
            Create room 
            <HiPlus />
          </Button>

          <Button $alt={true} onClick={join_menu}>
            Join 
            <TbDoorEnter />
          </Button>
        </Container_Menu>

        <Container_Menu $disabled={uiState !== "create" ? true : false}>
          <span className="key">
            {key || "a4w8aw1"} 
            <IconContext.Provider value={{ size: "20px" }}>
              <MdContentCopy />
            </IconContext.Provider>
          </span>

          <p className="status">{status}</p>

          <Button onClick={choose_player}>
            Iniciar jogo 
            <IoMdCheckmark />
          </Button>

          <Button $alt={true} onClick={back}>
            Voltar 
            <IoArrowBack />
          </Button>
        </Container_Menu>

        <Container_Menu $disabled={uiState !== "join" ? true : false}>
          <Input type={"text"} placeholder={"Sala"} onChange={change_room} />

          <Button onClick={join_room}>
            Entrar 
            <TbDoorEnter />
          </Button>

          <Button $alt={true} onClick={back}>
            Voltar 
            <IoArrowBack />
          </Button>
        </Container_Menu>

        <Container_Menu $disabled={uiState !== "ready" ? true : false}>
          <p className="room">Sala: {key || "a4w8aw1"}</p>

          <p className="status">{status}</p>

          <Button onClick={choose_player}>
            Pronto 
            <IoMdCheckmark />
          </Button>

          <Button $alt={true} onClick={back}>
            Voltar 
            <IoArrowBack />
          </Button>
        </Container_Menu>
      </Styled_Menu>
    </div>
  );
}
