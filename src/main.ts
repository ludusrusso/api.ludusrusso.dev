// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import express, { RequestHandler } from "express";
import { appConfig } from "./config";
import { logger } from "./logger";
import { gqlServer } from "./server";

const app = express();
app.use(express.json() as RequestHandler);

async function startServer() {
  await gqlServer.start();
  gqlServer.applyMiddleware({ app, path: "/graphql" });
}
startServer();

app.listen({ port: appConfig.port }, () => {
  logger.info(
    `🚀 server started at http://localhost:${appConfig.port}/graphql`
  );
});
