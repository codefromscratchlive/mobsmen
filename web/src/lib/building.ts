import * as v from "valibot";
import * as PIXI from "pixi.js";

export async function building_create(options: BuildingOptionsType): Promise<PIXI.Container> {
  const building_container = new PIXI.Container();
  building_container.label = options.name + "_container";
  building_container.x = options.x;
  building_container.y = options.y;


  const building_texture = await PIXI.Assets.load("/build/images/house.png");

  const building = new PIXI.Sprite(building_texture);
  building.label = options.name;
  building.interactive = true;
  building.cursor = "pointer";

  building_container.addChild(building);

  return building_container;
}

const BuildingOptionsSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  cash: v.number(),
  x: v.number(),
  y: v.number(),
  texture: v.optional(v.string()),
});

type BuildingOptionsType = v.InferOutput<typeof BuildingOptionsSchema>;