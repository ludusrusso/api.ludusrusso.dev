import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { logger } from "./logger";
import { AuthService } from "./services/auth.service";

interface CreateContextData {
  req: Request;
}

const createContextServices = () => {
  const db = new PrismaClient();
  return {
    db: db,
    auth: new AuthService(db),
  };
};

const services = createContextServices();

export const createContext = async ({ req }: CreateContextData) => {
  const user = await services.auth.verifyUser(req);
  logger.info({
    email: user?.email,
  });

  return {
    ...services,
    user,
    req,
  };
};

export type GqlContext = Awaited<ReturnType<typeof createContext>>;
