 import * as PIXI from 'pixi.js';

export async function roads_create(
  x: number,
  y: number,
  width: number,
  height: number
): Promise<PIXI.Container> {
  const road_container = new PIXI.Container();

  const background_texture = await PIXI.Assets.load("/build/images/texture.webp");

  const background = new PIXI.TilingSprite({
    texture: background_texture,
    width: width,
    height: height
  });

  background.tileScale.set(0.35, 0.35);

  road_container.addChild(background);
  road_container.x = x;
  road_container.y = y;
  return road_container;
}