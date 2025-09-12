import { should_never_happen } from "../../../lib/src/should";
import { player_get_attribute } from "./player";
import { util_event_handler } from "./util";

export function profile_init() {
  const profile_container = document.getElementById("hud-profile");
  if (!profile_container) {
    // ... break horribly
    should_never_happen("Resources container not found");
    // We never get to this point, but we must make Typescript happy
    return;
  }
  profile_container.innerHTML = `
    <i class="fa-solid fa-user"></i>&nbsp;
  `;
  profile_handlers();
}

function profile_handlers() {
  util_event_handler({
    event_name: "click",
    handler_id: "hud-profile",
    id: "hud-profile",
    handler: () => {
      profile_visibility_toggle();
    }
  })
}

function profile_visibility_toggle(): void {
  if (profile_is_visible()) {
    profile_card_hide();
  } else {
    profile_card_show();
  }
}

function profile_card_show(): void {
  const app = document.getElementById("app");
  if (!app) {
    // ... break horribly
    should_never_happen("Resources container not found");
    // We never get to this point, but we must make Typescript happy
    return;
  }
  const profile_card = document.createElement("div");
  profile_card.id = "profile-card";
  profile_card.innerHTML = `
    <div class="profile-card-header mb-4">
      <h2 class="subtitle is-4">Character</h2>
    </div>
    <div class="profile-card-content">
      <table class="table is-bordered is-striped is-hoverable is-fullwidth">
        <tbody>
          <tr>
            <th><i class="fa-solid fa-hand-fist"></i> Strength: </th>
            <td>${player_get_attribute("strength")}</td>
          </tr>
          <tr>
            <th><i class="fa-solid fa-user-ninja"></i> Stealth: </th>
            <td>${player_get_attribute("stealth")}</td>
          </tr>
          <tr>
            <th><i class="fa-solid fa-user-tie"></i> Charisma: </th>
            <td>${player_get_attribute("charisma")}</td>
          </tr>
          <tr>
            <th><i class="fa-solid fa-person-running-fast"></i> Agility: </th>
            <td>${player_get_attribute("agility")}</td>
          </tr>
          <tr>
            <th><i class="fa-solid fa-pool-8-ball"></i> Luck: </th>
            <td>${player_get_attribute("luck")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  
  app.appendChild(profile_card);
}

function profile_card_hide(): void {
  const profile_card = document.getElementById("profile-card");
  if (!profile_card) {
    should_never_happen("Tried to hide profile card but it doesn't exist");
    return;
  }

  // Completely remove element
  profile_card.remove();
}

function profile_is_visible(): boolean {
  const profile_card = document.getElementById("profile-card");
  if (!profile_card) {
    return false;
  }
  return true;
}