import type { BuildingInfoType } from "./building";
import { helpers_clamp } from "./helpers";
import type { PlayerAttributes } from "./player";

export function formulas_building_extort(
  building: BuildingInfoType,
  player: PlayerAttributes
) : FormulasResult {
  const success = (
    player.strength+
    (player.charisma/ 2) +
    (player.luck / 2)
  ) * 10 - building.resistance * 5;
  const duration = 4 - (player.agility / 2) + (building.resistance / 4);
  return { 
    success: helpers_clamp(success, 15, 85),
    duration: helpers_clamp(duration, 1, 6)
  };
}

export function formulas_building_steal(
  building: BuildingInfoType,
  player: PlayerAttributes
) : FormulasResult {
  const success = (
    player.stealth +
    (player.agility / 2) +
    (player.luck / 2)
  ) * 10 - building.security * 6;
  const duration = 3 - (player.agility / 2) + (building.security / 3);
  return { 
    success: helpers_clamp(success, 15, 85),
    duration: helpers_clamp(duration, 1, 5)
  };
}

export function formulas_building_scout(
  building: BuildingInfoType,
  player: PlayerAttributes
) : FormulasResult {
  const success = (
    player.luck +
    (player.agility / 2) +
    (player.stealth / 2)
  ) * 10 - building.alertness* 4;
  const duration = 2 - (player.agility / 3) + (building.alertness / 5);
  return { 
    success: helpers_clamp(success, 85, 95),
    duration: helpers_clamp(duration, 0.5, 3)
  };
}



export type FormulasResult = {
  success: number,
  duration: number
}