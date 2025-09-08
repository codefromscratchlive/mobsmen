import { should_never_happen } from "../../../lib/src/should";

export function resources_init(cash: number) {
  const resources_container = document.getElementById("hud-resources");
  if (!resources_container) {
    // ... break horribly
    should_never_happen("Resources container not found");
    // We never get to this point, but we must make Typescript happy
    return;
  }
  resources_container.innerHTML = `
    <i class="fa-solid fa-sack-dollar"></i>
    <span id="hud-resources-cash">${cash}</span>
  `;
}