import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { should_never_happen } from "../../../lib/src/should";
import { app_canvas_setup, app_create, app_viewport_create } from "../lib/app";
import { hud_create } from "../lib/hud";
import { notifications_create, notifications_init } from "../lib/notifications";
import { resources_init } from "../lib/resources";
import { roads_create } from "../lib/roads";
import { time_end, time_pause_toggle, time_start } from "../lib/time";
import { building_create } from "../lib/building";
import building_data from "./m001.toml";
import { profile_init } from "../lib/profile";

export async function init(): Promise<void> {
  const root_element = document.getElementById("app");
  if (!root_element) {
    should_never_happen("Root element not found");
    return;
  }

  const notifications_wrapper = notifications_init();
  root_element.appendChild(notifications_wrapper);

  const hud = hud_create();
  for (const h of hud) {
    root_element.appendChild(h);
  }

  const app = await app_create();
  const canvas = app_canvas_setup(app);
  root_element.appendChild(canvas);
  const viewport = await app_viewport_create(app);
  app.stage.addChild(viewport);

  await m001_roads_create(viewport);
  await m001_buildings_create(viewport);

  time_start(new Date("1918-11-11T00:00:00.000Z"));
  time_end(new Date("1918-11-18T00:00:00.000Z"));

  profile_init();
  resources_init(0);

  // Bring the viewport to the center
  viewport.animate({
    scale: 0.75,
    time: 1000,
    position: {
      x: 500,
      y: 500
    },
    ease: "easeInOutQuad"
  })

  notifications_create(
    `
    The time has been paused!<br>
    You have one week to get $100 in cash.<br>
    <span style="color: red;">Good Luck!</span>
    `
  );

  time_pause_toggle();
}

async function m001_buildings_create(viewport: Viewport): Promise<void> {
  const buildings_container = m001_container_create("buildings");
  buildings_container.sortableChildren = true;

  for (let i = 0; i < building_data.buildings.length; i++) {
    const building = building_data.buildings[i];
    const building_instance = await building_create(building);
    buildings_container.addChild(building_instance);
  }

  viewport.addChild(buildings_container);
}

async function m001_roads_create(viewport: Viewport): Promise<void> {
  const roads_container = m001_container_create("roads");
  const road_1 = await roads_create(500, 0, 50, 900);
  const road_2 = await roads_create(100, 900, 850, 50);
  const road_3 = await roads_create(100, 0, 50, 900);
  const road_4 = await roads_create(900, 0, 50, 900);
  const road_5 = await roads_create(100, 0, 850, 50);

  roads_container.addChild(road_1);
  roads_container.addChild(road_2);
  roads_container.addChild(road_3);
  roads_container.addChild(road_4);
  roads_container.addChild(road_5);

  viewport.addChild(roads_container);
}

function m001_container_create(label: string): PIXI.Container {
  const container = new PIXI.Container();
  container.label = label;
  return container;
}