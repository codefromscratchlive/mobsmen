import * as PIXI from 'pixi.js';
import { app_viewport_get } from './app';

export function helpers_pixi_tooltip_create(text: string, position: PIXI.Point): PIXI.Container {
  const tooltip_container = new PIXI.Container();

  const background = new PIXI.Graphics();
  background
    .rect(0, 0, 150, 40)
    .fill({
      color: 0x000000,
      alpha: 0.8
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
  tooltip_text.position.set(10, 10); // Offset inside background
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
  } else {
    console.warn(`No container found with label: ${label}`);
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