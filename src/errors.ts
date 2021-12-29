import { ApolloError } from "apollo-server-express";

export const ErrorCodes = {
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_LOGIN: "INVALID_LOGIN",
  SOURCE_NOT_FOUND: "SOURCE_NOT_FOUND",
  GROUP_NOT_FOUND: "GROUP_NOT_FOUND",
} as const;

export class InvalidTokenError extends ApolloError {
  constructor(message = "invalid token") {
    super(message, ErrorCodes.INVALID_TOKEN);

    Object.defineProperty(this, "name", { value: "InvalidTokenError" });
  }
}

export class InvalidLoginError extends ApolloError {
  constructor(message = "invalid login") {
    super(message, ErrorCodes.INVALID_LOGIN);

    Object.defineProperty(this, "name", { value: "InvalidLoginError" });
  }
}

export class InvalidRefreshError extends ApolloError {
  constructor(message = "invalid refresh token") {
    super(message, ErrorCodes.INVALID_REFRESH_TOKEN);

    Object.defineProperty(this, "name", {
      value: ErrorCodes.INVALID_REFRESH_TOKEN,
    });
  }
}

export class SourceNotFoundError extends ApolloError {
  constructor(message = "source not found") {
    super(message, ErrorCodes.SOURCE_NOT_FOUND);

    Object.defineProperty(this, "name", {
      value: ErrorCodes.SOURCE_NOT_FOUND,
    });
  }
}

export class GroupNotFoundError extends ApolloError {
  constructor(message = "group not found") {
    super(message, ErrorCodes.GROUP_NOT_FOUND);

    Object.defineProperty(this, "name", {
      value: ErrorCodes.GROUP_NOT_FOUND,
    });
  }
}
