import { should_never_happen } from "../../../lib/src/should";
import { helpers_get_saved_obj } from "./helpers";

export function player_generate_random_attributes(
  min: number = 1,
  max: number = 4,
  min_total: number = 7,
  max_total: number = 12
): PlayerAttributes {
  if (min_total > max_total || min > max || min_total < 5) {
    should_never_happen("Invalid attribute values");
    return {
      strength: 0,
      stealth: 0,
      charisma: 0,
      agility: 0,
      luck: 0,
    };
  }
  // Initialize attributes with minimum values
  let attributes: PlayerAttributes = {
    strength: min,
    stealth: min,
    charisma: min,
    agility: min,
    luck: min,
  };

  // Calculate remaining points to reach min_total
  let remaining_points = min_total - (min * 5); // 5 attributes * min value
  if (remaining_points <= 0) return attributes;
  let remaining_points_max = max_total - (min * 5); // 5 attributes * max value

  // Select how many points to distribute randomly, between remaining_points & remaining_points_max
  let points_to_distribute = Math.floor(
    Math.random() * (remaining_points_max - remaining_points + 1)
  ) + remaining_points;

  while (points_to_distribute > 0) {
    const attribute_keys = Object.keys(attributes) as (keyof PlayerAttributes)[];
    const random_attribute = attribute_keys[Math.floor(Math.random() * attribute_keys.length)];
    if (!random_attribute) continue;
    const current_value = attributes[random_attribute];

    if (current_value < max) {
      attributes[random_attribute] += 1;
      points_to_distribute -= 1;
    }
  }
  return attributes;
}

export function player_get_attributes(): PlayerAttributes {
  return helpers_get_saved_obj().player.attributes;
}

export type PlayerAttributes = {
  strength: number;
  stealth: number;
  charisma: number;
  agility: number;
  luck: number;
};