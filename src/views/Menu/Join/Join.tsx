import * as S from "./Join.styled";
import { socket } from "../../../App";

import { IconContext } from "react-icons";
import { HiPlus } from "react-icons/hi";
import { TbDoorEnter } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

import { Room_Socket } from "../../../services/actions/rooms";
import { Game_Socket } from "../../../services/actions/game";

import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { useState } from "react";
import { JoinConfig } from "./Join.config";

export function Join({ uiState: {uiState, setUi}, disabled, Game, Server }: JoinConfig) {
  const { game, setGame } = Game;
  const { username } = game;

  const { server, setServer } = Server;
  const { room, key, status } = server;

  const new_Room = new Room_Socket({ socket, username, room });
  const new_Game = new Game_Socket({ socket, username, room });

  const [playerReady, setReady] = useState(false);

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

  const join_room = (event: any) => {
    event.preventDefault();

    setUi("ready");
    new_Room.join_room();
  };

  const player_ready = (event: any) => {
    event.preventDefault();
    setReady(true);

    new_Game.player_ready();
  };

  const choose_player = (event: any) => {
    event.preventDefault();

    new_Game.choose_player();
  };

  const back = (event: any) => {
    event.preventDefault();

    setUi(null);
  };

  return (
    <S.Join disabled={disabled}>
      <S.Fieldset disabled={uiState !== null ? true : false}>
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
      </S.Fieldset>

      <S.Fieldset disabled={uiState !== "create" ? true : false}>
        <span className="key">
          {key || "a4w8aw1"} 
          <IconContext.Provider value={{ size: "20px" }}>
            <MdContentCopy />
          </IconContext.Provider>
        </span>

        <p className="status">{status}</p>

        <Button
          disabled={game.ready_to_start ? false : true}
          onClick={choose_player}
        >
          {game.ready_to_start ? "Iniciar jogo " : "Aguarde... "}
          {game.ready_to_start && <IoMdCheckmark />}
        </Button>

        <Button $alt={true} onClick={back}>
          Voltar 
          <IoArrowBack />
        </Button>
      </S.Fieldset>

      <S.Fieldset disabled={uiState !== "join" ? true : false}>
        <Input type={"text"} placeholder={"Sala"} onChange={change_room} />

        <Button onClick={join_room}>
          Entrar 
          <TbDoorEnter />
        </Button>

        <Button $alt={true} onClick={back}>
          Voltar 
          <IoArrowBack />
        </Button>
      </S.Fieldset>

      <S.Fieldset disabled={uiState !== "ready" ? true : false}>
        <p className="room">Sala: {key || "a4w8aw1"}</p>

        <p className="status">{status}</p>

        <Button disabled={playerReady} onClick={player_ready}>
          Pronto 
          <IoMdCheckmark />
        </Button>

        <Button $alt={true} onClick={back}>
          Voltar 
          <IoArrowBack />
        </Button>
      </S.Fieldset>
    </S.Join>
  );
}
