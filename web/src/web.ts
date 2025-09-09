import { should_never_happen } from "../../lib/src/should";
import { helpers_get_first_save_object, helpers_get_saved_obj, helpers_has_saved_obj, helpers_set_saved_obj, helpers_validate_version } from "./lib/helpers";

const VERSION = "0.0.6";

async function main() {
  const root_element = document.getElementById("app");
  if (!root_element) {
    should_never_happen("Root element not found");
    return;
  }
  if (!helpers_has_saved_obj()) {
    helpers_set_saved_obj(helpers_get_first_save_object(VERSION));
  }
  helpers_validate_version(VERSION);
  import(`./missions/${helpers_get_saved_obj().mission}.js`).then(m => m.init());
}

main();