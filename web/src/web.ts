import { should_never_happen } from "../../lib/src/should";

async function main() {
  const root_element = document.getElementById("app");
  if (!root_element) {
    should_never_happen("Root element not found");
    return;
  }

  const saved = window.localStorage.getItem("mobsmen");
  if (!saved) {
    // Import the first mission
    const first_mission = await import("./missions/001");
    first_mission.init();
  }
}

main();