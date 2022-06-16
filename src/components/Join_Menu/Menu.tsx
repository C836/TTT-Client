import { Styled_Menu } from "./Menu_styled";
import { socket } from "../../App";

import { Room_Socket } from "../../services/actions/rooms";
import { Game_Socket } from "../../services/actions/game";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";

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
  const { username, turn, signal, winners } = game;

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
      <input
        type={"text"}
        placeholder={"Apelido"}
        onChange={change_username}
      />

      <input
        type={"text"}
        placeholder={"Sala"}
        onChange={change_room}
      />

      <button 
        onClick={create_room}>
        Create
      </button>
      <button 
        onClick={join_room}>
        Join
      </button>

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
