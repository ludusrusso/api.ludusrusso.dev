import { PrismaClient, SignKey, User } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { nowPlusDays } from "../utils/dates";
import { generateKeyPairSync } from "crypto";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export interface AccessTokenPayload {
  uid: string;
  email: string;
}

export class AuthService {
  constructor(private readonly db: PrismaClient) {}

  async createUser(email: string, password: string): Promise<boolean> {
    const user = await this.db.user.create({
      data: {
        email,
        hashedPassword: this.hashPassword(password),
      },
    });
    return !!user;
  }

  async loginUser(email: string, password: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      this.verifyPassword("wrong", "");
      throw new ApolloError("invalid email or password", "INVALID_AUTH");
    }
    if (!this.verifyPassword(password, user.hashedPassword)) {
      throw new ApolloError("invalid email or password", "INVALID_AUTH");
    }

    const key = await this.getSignKey();

    const accessToken = this.createAccessToken(user, key);
    const refreshToken = this.createRefreshToken(user, key);
    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    return new Promise((resolve, reject) =>
      jwt.verify(
        token,
        async (header, cb) => {
          if (!header.kid) {
            return cb(new Error("cannot find kid"));
          }
          const key = await this.getSignKeyByKid(header.kid);
          if (!key) {
            return cb(new Error("cannot find kid"));
          }
          cb(null, key.publicKey);
        },
        { algorithms: ["RS256"], audience: "access" },
        (err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res as AccessTokenPayload);
        }
      )
    );
  }

  async verifyRefreshToken(token: string): Promise<string> {
    const { email, uid } = await new Promise<AccessTokenPayload>(
      (resolve, reject) =>
        jwt.verify(
          token,
          async (header, cb) => {
            if (!header.kid) {
              return cb(new Error("cannot find kid"));
            }
            const key = await this.getSignKeyByKid(header.kid);
            if (!key) {
              return cb(new Error("cannot find kid"));
            }
            cb(null, key.publicKey);
          },
          { algorithms: ["RS256"], audience: "refresh" },
          (err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res as AccessTokenPayload);
          }
        )
    );
    const singKey = await this.getSignKey();
    return this.createAccessToken({ email, id: uid }, singKey);
  }

  private createAccessToken(user: Pick<User, "email" | "id">, key: SignKey) {
    const payload: AccessTokenPayload = {
      email: user.email,
      uid: user.id,
    };

    return jwt.sign(payload, key.privateKey, {
      audience: "access",
      algorithm: "RS256",
      keyid: key.id,
      expiresIn: "15m",
    });
  }

  private createRefreshToken(user: User, key: SignKey) {
    const payload: AccessTokenPayload = {
      email: user.email,
      uid: user.id,
    };

    return jwt.sign(payload, key.privateKey, {
      audience: "refresh",
      algorithm: "RS256",
      keyid: key.id,
      expiresIn: "1d",
    });
  }

  private hashPassword(password: string) {
    const salt = genSaltSync(SALT_ROUNDS);
    const hash = hashSync(password, salt);
    return hash;
  }

  private verifyPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  private async getSignKeyByKid(kid: string) {
    return this.db.signKey.findFirst({
      where: {
        id: kid,
        expiresAt: {
          gte: new Date(),
        },
      },
    });
  }

  private async getSignKey() {
    const key = await this.db.signKey.findFirst({
      where: {
        expiresAt: {
          gte: nowPlusDays(15),
        },
      },
    });
    if (key) {
      return key;
    }
    return await this.createSignKey();
  }

  private async createSignKey() {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    return await this.db.signKey.create({
      data: {
        publicKey,
        privateKey,
        expiresAt: nowPlusDays(30),
      },
    });
  }
}
