import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

let active_viewport: Viewport | null = null;

export async function app_create(): Promise<PIXI.Application> {
  const app = new PIXI.Application();
  await app.init({
    background: "#1099bb",
    resizeTo: window,
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio,
  });
  return app;
}

export function app_canvas_setup(app: PIXI.Application): HTMLCanvasElement {
  const canvas = app.canvas;
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, { passive: false });
  return canvas;
}

export async function app_viewport_create(app: PIXI.Application): Promise<Viewport> {
  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: window.innerWidth,
    worldHeight: window.innerHeight,
    events: app.renderer.events,
    disableOnContextMenu: true
  });
  viewport.drag().pinch().wheel().decelerate();
  viewport.sortableChildren = true;
  active_viewport = viewport;
  return viewport;
}

export function app_viewport_get(): Viewport | null {
  return active_viewport;
}