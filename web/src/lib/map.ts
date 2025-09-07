import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

export function map_1_create(viewport: Viewport): void {
  map_1_roads_create(viewport);
  map_1_buildings_create(viewport);
}

function map_1_buildings_create(viewport: Viewport): void {
  const buildings_container = map_container_create("buildings");
  const building_1 = map_rectangle_create(100, 100, 300, 100, 0xff0000, 0.5);
  const building_2 = map_rectangle_create(200, 300, 200, 100, 0x00ff00, 0.5);
  const building_3 = map_rectangle_create(300, 500, 100, 100, 0xff0000, 0.5);
  const building_4 = map_rectangle_create(100, 700, 300, 100, 0x0000ff, 0.5);

  const building_5 = map_rectangle_create(600, 100, 200, 100, 0xff0000, 0.5);
  const building_6 = map_rectangle_create(600, 300, 100, 100, 0x00ff00, 0.5);
  const building_7 = map_rectangle_create(600, 500, 200, 100, 0xff0000, 0.5);
  const building_8 = map_rectangle_create(600, 700, 200, 100, 0x0000ff, 0.5);

  buildings_container.addChild(building_1);
  buildings_container.addChild(building_2);
  buildings_container.addChild(building_3);
  buildings_container.addChild(building_4);

  buildings_container.addChild(building_5);
  buildings_container.addChild(building_6);
  buildings_container.addChild(building_7);
  buildings_container.addChild(building_8);

  viewport.addChild(buildings_container);
}

function map_1_roads_create(viewport: Viewport): void {
  const roads_container = map_container_create("roads");
  const road_1 = map_rectangle_create(500, 0, 50, 900, 0xaaaaaa, 0.85);
  const road_2 = map_rectangle_create(0, 900, 1000, 50, 0xaaaaaa, 0.85);

  roads_container.addChild(road_1);
  roads_container.addChild(road_2);

  viewport.addChild(roads_container);
}

function map_container_create(label: string): PIXI.Container {
  const container = new PIXI.Container();
  container.label = label;
  return container;
}

function map_rectangle_create(
  x: number,
  y: number,
  width: number,
  height: number,
  fill_color: number = 0xDEDEDE,
  fill_alpha: number = 1,
  stroke_color: number = 0x000000,
  stroke_alpha: number = 0
): PIXI.Graphics {
  const graphics = new PIXI.Graphics();
  graphics
    .rect(x, y, width, height)
    .fill({
      color: fill_color,
      alpha: fill_alpha 
    })
    .stroke({
      color: stroke_color,
      alpha: stroke_alpha
    });
  return graphics;
}