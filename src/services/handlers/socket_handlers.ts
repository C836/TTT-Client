import { useEffect } from "react";
import { Socket } from "socket.io-client";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";

interface Props {
  socket: Socket;
  game: Game_Config;
  setBoard: React.Dispatch<React.SetStateAction<string[]>>;
  setGame: React.Dispatch<React.SetStateAction<Game_Config>>;
  setServer: React.Dispatch<React.SetStateAction<Server_Config>>;
}

interface Room_Status_Config {
  key: string;
  status: string;
}

interface Start_Player_Config {
  board: string[];
  selected: string;
}

interface Receive_Position_Config {
  board: string[];
  id: string;
}

interface Reset_Config {
  board: string[];
  winners: string[];
}

export default function socket_handlers(props: Props) {
  const { socket, game, setBoard, setGame, setServer } = props;

  const room_status = (response: Room_Status_Config) => {
    const { key, status } = response;

    switch (status) {
      case "created": {
        setServer((state) => {
          return {
            ...state,
            room: key,
            key: key,
            status: "Aguardando jogador...",
          };
        });

        break;
      }

      case "joined": {
        setGame((state) => {
          return {
            ...state,
            signal: 1,
          };
        });

        setServer((state) => {
          return {
            ...state,
            room: key,
            status: "Conectado",
          };
        });

        break;
      }

      case "joined_peer": {
        setServer((state) => {
          return {
            ...state,
            status: "Par conectado",
          };
        });

        break;
      }

      case "starting": {
        setServer((state) => {
          return {
            ...state,
            status: "Conexão estabelecida",
          };
        });

        break;
      }
    }
  };

  const ready_to_start = () => {
    setGame((state) => {
      return {
        ...state,
        ready_to_start: true,
      };
    });
  };

  const start_player = (response: Start_Player_Config) => {
    const { board, selected } = response;

    setBoard(board);

    setServer((state) => {
      return {
        ...state,
        ingame: true,
      };
    });

    if (selected === socket.id) {
      setGame((state) => {
        return { ...state, turn: true };
      });
    } else {
      setGame((state) => {
        return { ...state, turn: false };
      });
    }
  };

  const receive_position = (response: Receive_Position_Config) => {
    const { id, board } = response;

    if (id !== socket.id) {
      setGame((state) => {
        return { ...state, turn: true };
      });
    }

    setBoard(board);
  };

  const reset = (response: Reset_Config) => {
    const { winners, board } = response;
    const LAST_WINNER = winners[winners.length - 1];

    if (LAST_WINNER === socket.id) {
      setGame((state) => {
        return { ...state, turn: true };
      });
    }

    setBoard(board);
  };

  const win = (response: { winner: string }) => {
    const { winner } = response;
    let winners = game.winners;

    winners.push(winner);

    setGame((state) => {
      return { ...state, turn: false, winners: winners };
    });
  };

  useEffect(() => {
    socket.on("room_status", room_status);
    socket.on("ready_to_start", ready_to_start);
    socket.on("start_player", start_player);
    socket.on("receive_position", receive_position);
    socket.on("reset", reset);
    socket.on("win", win);
    socket.on("reset_movements", () => {
      socket.emit("reset_movements");
    });

    return () => {
      socket.off("room_status", room_status);
      socket.off("start_player", start_player);
      socket.off("receive_position", receive_position);
      socket.off("reset", reset);
      socket.off("win", win);
    };
  }, [socket]);
}
