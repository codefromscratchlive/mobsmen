import { should_never_happen } from "../../lib/src/should";
import { app_canvas_setup, app_create, app_viewport_create } from "./lib/app";
import { map_1_create } from "./lib/map";
import { hud_create } from "./lib/hud";
import { time_start } from "./lib/time";
import { notifications_init, notifications_create } from "./lib/notifications";

async function main() {
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

  map_1_create(viewport);

  time_start(new Date("1918-11-11T00:00:00.000Z"));

  notifications_create("The time has started!");
}

main();