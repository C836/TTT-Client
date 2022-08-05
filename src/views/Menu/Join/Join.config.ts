import { ServerGameConfig } from "../../../types";

export interface JoinConfig extends ServerGameConfig {
  disabled: boolean;
  uiState: {
    uiState: string | null;
    setUi: React.Dispatch<React.SetStateAction<string | null>>;
  };
}
