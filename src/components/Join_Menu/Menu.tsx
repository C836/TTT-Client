import { Styled_Menu } from "./Menu_styled";
import { socket } from "../../App";

import { HiPlus } from "react-icons/hi"
import { TbDoorEnter } from "react-icons/tb"

import { Room_Socket } from "../../services/actions/rooms";
import { Game_Socket } from "../../services/actions/game";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import Logo from "../Logo/Logo";

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

  const create_room = () => {
    new_Room.create_room()
  };

  const join_room = () => {
    new_Room.join_room()
  }

  const choose_player = () => {
    new_Game.choose_player()
  }

  return (
    <Styled_Menu>
      <Logo />
      <Input
        type={"text"}
        placeholder={"Nickname"}
        onChange={change_username}
      />

      {/* <Input
        type={"text"}
        placeholder={"Sala"}
        onChange={change_room}
      /> */}

      <Button
        onClick={create_room}>
        Create room <HiPlus />
      </Button>
      <Button 
        onClick={join_room}
        alt={"true"}>
        Join <TbDoorEnter />
      </Button>

      <p>{key}</p>

      {status !== "ready" 
      ? <p>{status}</p>
      : <button
          onClick={choose_player}>
          Start Game
        </button>
      }
    </Styled_Menu>
  );
}
