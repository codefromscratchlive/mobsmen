import { should_never_happen } from "../../lib/src/should";
import { helpers_generate_random_attribute_values } from "./lib/helpers";

const VERSION = "0.0.3";

async function main() {
  const root_element = document.getElementById("app");
  if (!root_element) {
    should_never_happen("Root element not found");
    return;
  }
  const saved = window.localStorage.getItem("mobsmen");
  if (!saved) {
    // Create the save
    window.localStorage.setItem("mobsmen", JSON.stringify({
      version: VERSION,
      mission: "m001",
      attributes: helpers_generate_random_attribute_values(),
    }));
    // Import the first mission
    const first_mission = await import("./missions/m001");
    first_mission.init();
  } else {
    const saved_obj = JSON.parse(saved);
    const saved_version = saved_obj.version;
    if (!saved_version || VERSION !== saved_version) {
      window.localStorage.removeItem("mobsmen");
      location.reload();
    }
    const mission = await import(`./missions/${saved_obj.mission}.js`);
    mission.init();
  }
}

main();