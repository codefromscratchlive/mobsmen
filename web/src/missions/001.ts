import { should_never_happen } from "../../../lib/src/should";
import { app_canvas_setup, app_create, app_viewport_create } from "../lib/app";
import { hud_create } from "../lib/hud";
import { map_1_create } from "../lib/map";
import { notifications_create, notifications_init } from "../lib/notifications";
import { resources_init } from "../lib/resources";
import { time_end, time_pause_toggle, time_start } from "../lib/time";

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

  map_1_create(viewport);

  time_start(new Date("1918-11-11T00:00:00.000Z"));
  time_end(new Date("1918-11-18T00:00:00.000Z"));

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
    You have one week to get $1000 in cash.<br>
    <span style="color: red;">Good Luck!</span>
    `
  );

  time_pause_toggle();
}