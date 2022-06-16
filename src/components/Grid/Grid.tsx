import { Grid_Styled } from "./Grid_styled";
import { Position } from "./Position";

import { socket } from "../../App";

import { Room_Socket } from "../../services/actions/rooms";
import { Game_Socket } from "../../services/actions/game";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";

interface Props {
  board: string[];
  Game: {
    game: Game_Config;
    setGame: Function;
  };
  Server: {
    server: Server_Config;
    setServer: Function;
  };
}

export default function Grid({ Game, Server, board }: Props) {
  const { game, setGame } = Game;
  const { username, turn, signal, winners } = game;

  const { server, setServer } = Server;
  const { room, key, status } = server;

  const new_Room = new Room_Socket({ socket, username, room });
  const new_Game = new Game_Socket({ socket, username, room });

  const send_position = (position: number) => {
    setGame((state: object) => {
      return {
        ...state,
        turn: false,
      };
    });
    new Game_Socket({ socket, username, room }).new_move(
      position,
      signal,
      board
    );
  };

  return (
    <Grid_Styled 
    disabled={turn ? false : true}>
      {board.map((item, index) => (
        <Position
          key={index}
          value={index}
          onClick={(event) => {
            send_position(Number((event.target as HTMLButtonElement).value));
          }}
        >
          {item}
        </Position>
      ))}
    </Grid_Styled>
  );
}
