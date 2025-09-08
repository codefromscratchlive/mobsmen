import * as PIXI from "pixi.js";
import { should_never_happen } from "../../../lib/src/should";
import { util_event_handler } from "./util";

let current_date = new Date();
let speed_factor = [
  1,
  2,
  5,
  10,
  20
];
let current_speed = 0;
let paused = true;
let ticker: PIXI.Ticker = new PIXI.Ticker();

let end_date: Date = new Date("1800-11-11T00:00:00.000Z");

export function time_start(start_date: Date, speed: number = 5): PIXI.Ticker {
  current_speed = speed;
  current_date = start_date;
  const time_container = document.getElementById("hud-time");
  if (!time_container) {
    // ... break horribly
    should_never_happen("Time container not found");
    // We never get to this point, but we must make Typescript happy
    return new PIXI.Ticker();
  }
  ticker.minFPS = 30;
  ticker.maxFPS = 60;
  ticker.add((time) => {
    current_date.setSeconds(current_date.getSeconds() + (time.deltaTime * current_speed));
    time_container.textContent = current_date.toDateString() +
    " " +
    String(current_date.getHours()).padStart(2, "0") +
    ":" +
    String(current_date.getMinutes()).padStart(2, "0");
  });

  time_handlers_setup();

  ticker.start();
  paused = false;

  return ticker;
}

export function time_end(end: Date) {
  end_date = end;
}

export function time_speed_increase_single(): number {
  let current_speed_index = speed_factor.indexOf(current_speed);
  if (current_speed_index < speed_factor.length - 1) {
    let new_speed_factor = speed_factor[current_speed_index + 1]
    if (new_speed_factor) {
      current_speed = new_speed_factor;
    }
  }

  return current_speed;
}

export function time_speed_increase_max(): number {
  let new_speed = speed_factor[speed_factor.length - 1];
  if (new_speed) {
    current_speed = new_speed;
  }

  return current_speed;
}

export function time_speed_decrease_single(): number {
  let current_speed_index = speed_factor.indexOf(current_speed);
  if (current_speed_index > 0) {
    let new_speed_factor = speed_factor[current_speed_index - 1]
    if (new_speed_factor) {
      current_speed = new_speed_factor;
    }
  }

  return current_speed;
}

export function time_speed_decrease_max(): number {
  let new_speed = speed_factor[0];
  if (new_speed) {
    current_speed = new_speed;
  }

  return current_speed;
}

export function time_pause_toggle() {
  const message_container = document.getElementById("hud-time-message");
  if (!message_container) {
    // ... break horribly
    should_never_happen("Time message container not found");
    // We never get to this point, but we must make Typescript happy
    return;
  }
  if (paused) {
    message_container.style.display = "none";
    ticker.start();
    paused = false;
  } else {
    time_message_show("Paused", 0);
    ticker.stop();
    paused = true;
  }
}

export function time_message_show(message: string, disappear: number = 1000) {
  const message_container = document.getElementById("hud-time-message");
  if (!message_container) {
    // ... break horribly
    should_never_happen("Time message container not found");
    // We never get to this point, but we must make Typescript happy
    return;
  }
  message_container.textContent = message;
  message_container.style.display = "block";
  // @cfs: fix this to update the timeout when a new speed is selected
  if (disappear > 0) {
    setTimeout(() => {
      message_container.style.display = "none";
    }, disappear);
  }
}

export function time_is_paused(): boolean {
  return paused;
}

export function time_handlers_setup(): void {
  util_event_handler({
    event_name: "click",
    handler_id: "btn-time-slow-max",
    id: "btn-time-slow-max",
    handler: () => {
      let speed = time_speed_decrease_max();
      let speed_string = String(speed/5) + "x";
      time_message_show(speed_string);
    }
  });

  util_event_handler({
    event_name: "click",
    handler_id: "btn-time-slow-single",
    id: "btn-time-slow-single",
    handler: () => {
      let speed = time_speed_decrease_single();
      let speed_string = String(speed/5) + "x";
      time_message_show(speed_string);
    }
  });

  util_event_handler({
    event_name: "click",
    handler_id: "btn-time-fast-max",
    id: "btn-time-fast-max",
    handler: () => {
      let speed = time_speed_increase_max();
      let speed_string = String(speed/5) + "x";
      time_message_show(speed_string);
    }
  });

  util_event_handler({
    event_name: "click",
    handler_id: "btn-time-fast-single",
    id: "btn-time-fast-single",
    handler: () => {
      let speed = time_speed_increase_single();
      let speed_string = String(speed/5) + "x";
      time_message_show(speed_string);

    }
  });

  util_event_handler({
    event_name: "click",
    handler_id: "hud-time",
    id: "hud-time",
    handler: () => {
      time_pause_toggle();
    }
  });

  util_event_handler({
    event_name: "click",
    handler_id: "hud-time-message",
    id: "hud-time-message",
    handler: () => {
      time_pause_toggle();
    }
  });
}