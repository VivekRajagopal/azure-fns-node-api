import { HttpRequestHeaders } from "@azure/functions";
import * as O from "fp-ts/lib/Option";
import jwt_decode from "jwt-decode";

type RequestHeaders = {
  authorization?: string | undefined; // Azure Functions
} & HttpRequestHeaders;

export type JwtClaims = {};

export const getBearerTokenFromHeaders = ({
  authorization
}: RequestHeaders) => {
  if (!authorization) {
    return O.none;
  }

  const [_, token] = authorization.split(" ");
  return O.some(token);
};

export const getJwtClaims = (token: string) => {
  return jwt_decode<JwtClaims>(token);
};
