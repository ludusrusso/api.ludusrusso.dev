import Pino from "pino";
import { appConfig } from "./config";

export const logger = Pino({
  level: appConfig.debug ? "debug" : "info",
});
