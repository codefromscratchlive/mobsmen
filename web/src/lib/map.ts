import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { building_create } from "./building";

export async function map_1_create(viewport: Viewport): Promise<void> {
  /*
  const background_texture = await PIXI.Assets.load("/build/images/background.jpg");
  const background = new PIXI.TilingSprite({
    texture: background_texture
  });
  viewport.addChild(background);
  */
  map_1_roads_create(viewport);
  await map_1_buildings_create(viewport);
}

async function map_1_buildings_create(viewport: Viewport): Promise<void> {
  const buildings_container = map_container_create("buildings");
  const building_1 = await building_create({
    name: "building_1",
    x: 200,
    y: 0,
    cash: 1000
  });
  const building_2 = await building_create({
    name: "building_2",
    x: 200,
    y: 300,
    cash: 1000
  });
  const building_3 = await building_create({
    name: "building_3",
    x: 200,
    y: 600,
    cash: 1000
  });

  const building_4 = await building_create({
    name: "building_4",
    x: 550,
    y: 0,
    cash: 1000
  });

  const building_5 = await building_create({
    name: "building_5",
    x: 550,
    y: 300,
    cash: 1000
  });

  const building_6 = await building_create({
    name: "building_6",
    x: 550,
    y: 600,
    cash: 1000
  });

  buildings_container.addChild(building_1);
  buildings_container.addChild(building_2);
  buildings_container.addChild(building_3);

  buildings_container.addChild(building_4);
  buildings_container.addChild(building_5);
  buildings_container.addChild(building_6);

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