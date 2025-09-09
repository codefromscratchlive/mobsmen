import { should_never_happen } from "../../lib/src/should";

const VERSION = "0.0.1";

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
      mission: "001",
      save: "",
    }));
    // Import the first mission
    const first_mission = await import("./missions/m001");
    first_mission.init();
  } else {
    const saved_obj = JSON.parse(saved);
    const mission = await import(`./missions/${saved_obj.mission}.js`);
    mission.init();
  }
}

main();