import * as PIXI from 'pixi.js';
import { app_viewport_get } from './app';
import { should_never_happen } from '../../../lib/src/should';

export function helpers_pixi_tooltip_create(text: string, position: PIXI.Point): PIXI.Container {
  // Only one tooltip should be active at any given point, so destroy any existing ones
  helpers_pixi_remove_container_by_label('tooltip');

  const tooltip_container = new PIXI.Container();

  tooltip_container.eventMode = "none";

  const background = new PIXI.Graphics();
  background
    .roundRect(0, 0, 200, 200) // Temporary dimensions, till we fit it to text
    .fill({
      color: 0x000000,
      alpha: 0.65
    });

  tooltip_container.addChild(background);

  // Text
  const tooltip_text = new PIXI.Text({
    text: text,
    style: {
      fontFamily: 'Epunda Slab',
      fontSize: 24,
      fill: 0xffffff, // White text
      align: 'center',
    }
  });
  const padding = 40;
  background.width = tooltip_text.width + padding;
  background.height = tooltip_text.height + padding;
  tooltip_text.position.set(padding / 2, padding / 2); // Offset inside background
  tooltip_container.addChild(tooltip_text);

  // Position the tooltip near the item or mouse
  tooltip_container.position.set(position.x + 10, position.y - 50);
  tooltip_container.label = 'tooltip';
  tooltip_container.zIndex = 1000;

  return tooltip_container;
}

export function helpers_pixi_remove_container_by_label(
  label: string,
  parent: PIXI.Container | null = null
): void {
  if (!parent) {
    parent = app_viewport_get();
    if (!parent) return;
  } 
  // Find the container with the matching label
  const container = parent.children.find((child) => (child).label === label);

  if (container) {
    // Remove the container from its parent
    if (container.parent) {
      container.parent.removeChild(container);
    }
    container.destroy({ children: true, texture: true });
  } 
}

export function helpers_pixi_get_container_by_label(
  label: string,
  parent: PIXI.Container | null = null
): PIXI.Container | false {
  if (!parent) {
    parent = app_viewport_get();
    if (!parent) return false;
  }
  // Find the container with the matching label
  const container = parent.children.find((child) => (child).label === label);

  if (container) {
    return container;
  } else {
    console.warn(`No container found with label: ${label}`);
    return false;
  }
}

export function helpers_generate_random_attribute_values(
  min: number = 1,
  max: number = 4,
  min_total: number = 7,
  max_total: number = 12
): HelperPlayerAttributes {
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
  let attributes: HelperPlayerAttributes = {
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
    const attribute_keys = Object.keys(attributes) as (keyof HelperPlayerAttributes)[];
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

export type HelperPlayerAttributes = {
  strength: number;
  stealth: number;
  charisma: number;
  agility: number;
  luck: number;
};