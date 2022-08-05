import { GameConfig, ServerConfig } from "./Socket.config";

export interface ServerGameConfig {
  Server: {
    server: ServerConfig;
    setServer: React.Dispatch<React.SetStateAction<ServerConfig>>;
  };
  Game: {
    game: GameConfig;
    setGame: React.Dispatch<React.SetStateAction<GameConfig>>;
  };
}
