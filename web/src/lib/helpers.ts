import * as PIXI from 'pixi.js';
import { app_viewport_get } from './app';
import { should_never_happen } from '../../../lib/src/should';
import type { GameSave } from './game';
import { player_generate_random_attributes } from './player';

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

export function helpers_has_saved_obj(): boolean {
  return localStorage.getItem('mobsmen') !== null;
}

export function helpers_get_saved_obj(): GameSave {
  const saved_obj = localStorage.getItem('mobsmen');
  if (!saved_obj) {
    should_never_happen('Saved object not found');
    return helpers_get_empty_save_object();
  };
  try {
    return JSON.parse(saved_obj);
  } catch(e) {
    should_never_happen('Saved object could not be parsed');
    return helpers_get_empty_save_object();
  }
}

export function helpers_set_saved_obj(obj: GameSave): void {
  localStorage.setItem('mobsmen', JSON.stringify(obj));
}

export function helpers_get_first_save_object(version: string): GameSave {
  return {
    version,
    mission: 'm001',
    player: {
      attributes: player_generate_random_attributes(),
    },
  };
}

export function helpers_validate_version(version: string): void {
  const saved_obj = helpers_get_saved_obj();
  if (saved_obj.version !== version)
    helpers_reset_save_and_reload();
}

function helpers_reset_save_and_reload(): void {
  localStorage.removeItem('mobsmen');
  location.reload();
}

function helpers_get_empty_save_object(): GameSave {
  return {
    version: "",
    mission: 'm001',
    player: {
      attributes: {
        strength: 0,
        stealth: 0,
        charisma: 0,
        agility: 0,
        luck: 0,
      },
    },
  };
}

export function helpers_clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}