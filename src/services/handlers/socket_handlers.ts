import { useEffect } from "react";
import { Socket } from "socket.io-client";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";

interface Props {
  socket: Socket;
  game: Game_Config;
  setBoard: React.Dispatch<React.SetStateAction<string[]>>
  setGame: React.Dispatch<React.SetStateAction<Game_Config>>;
  setServer: React.Dispatch<React.SetStateAction<Server_Config>>;
}

export default function socket_handlers(props: Props) {
  const { socket, game, setBoard, setGame, setServer } = props;

  useEffect(() => {
    socket.on("room_status", (response) => {
      if (response.status === "created") {
        setServer((state) => {
          return {
            ...state,
            room: response.key,
            key: response.key,
            status: "Waiting for player...",
          };
        });
      }

      if (response.status === "joined") {
        setGame((state) => {
          return {
            ...state,
            signal: 1,
          };
        });

        setServer((state) => {
          return {
            ...state,
            room: response.key,
            status: "Conected",
          };
        });
      }

      if (response.status === "joined_peer") {
        setServer((state) => {
          return {
            ...state,
            status: "Peer conected",
          };
        });
      }

      if (response.status === "starting") {
        setServer((state) => {
          return {
            ...state,
            status: "ready",
          };
        });
      }
    });

    socket.on("start_player", (data) => {
      setBoard(data.board);

      if (data.selected === socket.id) {
        setGame((state) => {
          return { ...state, turn: true };
        });
      }
    });

    socket.on("receive_position", (id, board) => {
      console.log(id, socket);

      if (id !== socket.id) {
        setGame((state) => {
          return { ...state, turn: true };
        });
      }

      setBoard(board);
    });

    socket.on("reset", (winners, board) => {
      if (winners[winners.length - 1] === socket.id) {
        setGame((state) => {
          return { ...state, turn: true };
        });
      }

      setBoard(board);
    });

    socket.on("win", (data) => {
      let winners = game.winners;
      winners.push(data.winner);

      setGame((state) => {
        return { ...state, turn: false, winners: winners };
      });
    });

    return () => {
      socket.off("win");
    };
  }, [socket]);
}
