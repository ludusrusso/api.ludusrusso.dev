import { PrismaClient } from "@prisma/client";
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
  return {
    ...services,
    req,
  };
};

export type GqlContext = Awaited<ReturnType<typeof createContext>>;
