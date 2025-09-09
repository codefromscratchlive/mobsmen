import type { PlayerAttributes } from "./player";

export function game_over() {

}

export type GameSave = {
  version: string;
  mission: string;
  player: {
    attributes: PlayerAttributes;
  };
};