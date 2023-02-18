import { DependencyContainer } from "tsyringe";
import { registerBehaviours } from "./behaviours/dependency";
import { registerPipelines } from "./pipeline/dependency";
import { registerRendering } from "./rendering/dependency";
import { registerServices } from "./services/dependency";
import { registerStores } from "./stores/dependency";

const registerApplication = (c: DependencyContainer) => {
  registerBehaviours(c);
  registerPipelines(c);
  registerRendering(c);
  registerServices(c);
  registerStores(c);
};

export { registerApplication };
