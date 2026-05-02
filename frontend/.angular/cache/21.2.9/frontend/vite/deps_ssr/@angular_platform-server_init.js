import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  index
} from "./chunk-YB5752LS.js";
import {
  init_define_NGX_ENV
} from "./chunk-TMKW3CHR.js";

// node_modules/@angular/platform-server/fesm2022/init.mjs
init_define_NGX_ENV();
function applyShims() {
  Object.assign(globalThis, index.impl);
  globalThis["KeyboardEvent"] = index.impl.Event;
}
applyShims();
var ɵɵmoduleMarker = true;
export {
  ɵɵmoduleMarker
};
//# sourceMappingURL=@angular_platform-server_init.js.map
