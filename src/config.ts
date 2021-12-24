import { getConfigs } from "env-ts-conf";

export const appConfig = getConfigs({
  debug: {
    type: "boolean",
    variableName: "DEBUG",
    default: false,
  },
  port: {
    type: "number",
    variableName: "port",
    default: 4000,
  },
});

export type AppConfig = typeof appConfig;
