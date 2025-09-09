import * as v from "valibot";
import * as PIXI from "pixi.js";
import { helpers_pixi_remove_container_by_label, helpers_pixi_tooltip_create } from "./helpers";
import { app_viewport_get } from "./app";
import { should_never_happen } from "../../../lib/src/should";
import { util_event_handler } from "./util";
import { formulas_building_extort, formulas_building_scout, formulas_building_steal } from "./formulas";
import { player_get_attributes } from "./player";

export async function building_create(options: BuildingInfoType): Promise<PIXI.Container> {
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
  const description = options.name;

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

  building.on("pointerup", () => {
    building_selection_show(options);
  })

  building_container.addChild(building);

  return building_container;
}

function building_selection_show(options: BuildingInfoType): void {
  const footer = document.querySelector('.hud-footer') as HTMLDivElement;
  if (!footer) {
    // ... break horribly
    should_never_happen("Footer not found");
    // We never get to this point, but we must make Typescript happy
    return;
  }
  // Clear previous contents of footer
  footer.innerHTML = "";
  const building_info_container = document.createElement("div");
  building_info_container.classList.add("building-info");
  building_info_container.innerHTML = `
    <div class="title">
      <div class="building-info-name">${options.name}</div>
    </div>
    <hr class="footer-divider">
    <div class="columns mm-text-sans">
      <div class="column is-one-third">
        <div class="building-info-story">${options.story}</div>
      </div>
      <div class="column is-one-third">
        <div class="building-info-entry building-info-occupants">
          <span class="building-info-title mm-text-slab">
            Occupants:
          </span>
          ${options.occupants}
        </div>
        <div class="building-info-entry building-info-type">
          <span class="building-info-title mm-text-slab">
            Type:
          </span>
          ${options.type}
        </div>
        <div class="building-info-entry building-info-availability">
          <span class="building-info-title mm-text-slab">
            Availability:
          </span>
          ${options.availability}
        </div>
        <div class="building-info-entry building-info-cash">
          <span class="building-info-title mm-text-slab">
            Cash:
          </span>
          $${options.cash}
        </div>
      </div>
      <div class="column is-one-third">
        <div class="building-actions">
          <button id="building-extort-${options.id}" class="button is-dark is-danger is-large is-fullwidth mb-4">
            <span class="icon">
              <i class="fa-solid fa-gun"></i>
            </span>
            <span>Extort</span>
          </button>
          <button id="building-steal-${options.id}" class="button is-dark is-warning is-large is-fullwidth mb-4">
            <span class="icon">
              <i class="fa-solid fa-people-robbery"></i>
            </span>
            <span>Steal</span>
          </button>
          <button id="building-scout-${options.id}" class="button is-dark is-info is-large is-fullwidth">
            <span class="icon">
              <i class="fa-solid fa-user-secret"></i>
            </span>
            <span>Scout</span>
          </button>
        </div>
      </div>
    </div>
  `;
  // Create button to close building info
  const close_button = document.createElement("button");
  close_button.classList.add("footer-close-button");
  close_button.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
  close_button.addEventListener("click", () => {
    footer.innerHTML = "";
  });
  building_info_container.appendChild(close_button);
  footer.appendChild(building_info_container);

  util_event_handler({
    id: `building-extort-${options.id}`,
    handler_id: `building-extort-${options.id}`,
    event_name: "click",
    handler: () => {
      building_handler_extort(options);
    }
  });

  util_event_handler({
    id: `building-steal-${options.id}`,
    handler_id: `building-steal-${options.id}`,
    event_name: "click",
    handler: () => {
      building_handler_steal(options);
    }
  });

  util_event_handler({
    id: `building-scout-${options.id}`,
    handler_id: `building-scout-${options.id}`,
    event_name: "click",
    handler: () => {
      building_handler_scout(options);
    }
  });
}

function building_handler_extort(options: BuildingInfoType): void {
  const result = formulas_building_extort(options, player_get_attributes());
  console.log(`EXTORT - Success: ${result.success}% | Duration: ${Math.round(result.duration*100)/100}hours`);
}

function building_handler_steal(options: BuildingInfoType): void {
  const result = formulas_building_steal(options, player_get_attributes());
  console.log(`STEAL - Success: ${result.success}% | Duration: ${Math.round(result.duration*100)/100}hours`);
}

function building_handler_scout(options: BuildingInfoType): void {
  const result = formulas_building_scout(options, player_get_attributes());
  console.log(`SCOUT - Success: ${result.success}% | Duration: ${Math.round(result.duration*100)/100}hours`);
}

const BuildingInfoSchema = v.object({
  id: v.number(),
  name: v.string(),
  story: v.string(),
  occupants: v.string(),
  type : v.string(),
  availability: v.string(),
  x: v.number(),
  y: v.number(),
  cash: v.number(),
  resistance: v.number(),
  security: v.number(),
  alertness: v.number(),
  texture: v.optional(v.string()),
});

export type BuildingInfoType = v.InferOutput<typeof BuildingInfoSchema>;