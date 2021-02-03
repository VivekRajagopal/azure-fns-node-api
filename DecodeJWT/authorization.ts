import { HttpRequestHeaders } from "@azure/functions";
import jwt_decode from "jwt-decode";

type RequestHeaders = {
  authorization?: string | undefined;
} & HttpRequestHeaders;

export type JwtClaims = {};

export const getBearerTokenFromHeaders = ({ authorization }: RequestHeaders) => {
  if (!authorization) {
    return;
  }

  const [_, token] = authorization.split(" ");
  return token as string | undefined;
};

export const getJwtClaims = (token: string) => {
  return jwt_decode<JwtClaims>(token);
};
