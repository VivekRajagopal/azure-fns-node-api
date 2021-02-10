import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { getJwtClaims, getBearerTokenFromHeaders } from "./authorization";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  customBinding: string
): Promise<void> {
  context.res = { yeeto: "cheeto" };

  // const jwtClaims = pipe(
  //   req.headers,
  //   getBearerTokenFromHeaders,
  //   O.chainNullableK(getJwtClaims),
  //   O.toUndefined
  // );

  // context.res = {
  //   status: 200,
  //   body: jwtClaims,
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // };
};

export default httpTrigger;
