import * as v from "valibot";
import * as PIXI from "pixi.js";
import { helpers_pixi_remove_container_by_label, helpers_pixi_tooltip_create } from "./helpers";
import { app_viewport_get } from "./app";

export async function building_create(options: BuildingOptionsType): Promise<PIXI.Container> {
  const building_container = new PIXI.Container();
  building_container.label = options.name + "_container";
  building_container.x = options.x;
  building_container.y = options.y;

  const building_texture = await PIXI.Assets.load("/build/images/house.png");

  const building = new PIXI.Sprite(building_texture);
  building.label = options.name;
  building.cursor = "pointer";
  building.eventMode = "static";
  building.hitArea = new PIXI.Rectangle(25, 25, 250, 250);
  const description = options.description ?? options.name;

  building.on("pointerover", (_) => {
    const tooltip = helpers_pixi_tooltip_create(
      description, 
      new PIXI.Point(
        building_container.x + building.width / 2,
        building_container.y + building.height / 2
      )
    );
    app_viewport_get()?.addChild(tooltip);
    app_viewport_get()?.sortChildren();
  });

  building.on("pointerout", () => {
    helpers_pixi_remove_container_by_label("tooltip");
  });

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