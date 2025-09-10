import * as PIXI from "pixi.js";
import { should_never_happen } from "../../../lib/src/should";
import { util_event_handler } from "./util";
import { notifications_create } from "./notifications";

let current_date = new Date();
let speed_factor = [
  1,
  2,
  5,
  25,
  50,
  100,
  500
];
let current_speed = 0;
let paused = true;
let ticker: PIXI.Ticker = new PIXI.Ticker();

let end_date: Date = new Date("1800-11-11T00:00:00.000Z");

export function time_start(start_date: Date, speed: number = 25): PIXI.Ticker {
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

    if (current_date >= end_date) {
      notifications_create("Game Over!");
      ticker.stop();
      paused = true;
    }
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

export function time_callback_at_time(
  time: Date,
  progress_callback: (progress: number) => void,
  end_callback: () => void
) {
  const custom_ticker = new PIXI.Ticker();
  const start_time = current_date.getTime();
  const end_time = time.getTime();
  const total_duration = end_time - start_time;

  // Ensure the end time is in the future relative to current_date
  if (total_duration <= 0) {
    end_callback();
    return;
  }

  let last_progress = 0;

  custom_ticker.add(() => {
    const now = current_date.getTime();
    const elapsed = now - start_time;
    const progress = Math.min(elapsed / total_duration, 1); // Progress from 0 to 1

    // Calculate the current 10% interval (e.g., 0.1, 0.2, ..., 1.0)
    const current_interval = Math.floor(progress * 10) / 10;
    if (current_interval > last_progress && current_interval <= 1) {
      progress_callback(current_interval);
      last_progress = current_interval;
    }

    if (now >= end_time) {
      end_callback();
      custom_ticker.stop();
    }
  });

  custom_ticker.start();
}

export function time_get_current_date(): Date {
  return current_date;
}