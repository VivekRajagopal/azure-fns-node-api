import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getJwtClaims, getBearerTokenFromHeaders } from "./authorization";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const bearerToken = getBearerTokenFromHeaders(req.headers);
  const jwtClaims = bearerToken ? getJwtClaims(bearerToken) : undefined;

  console.log(req.headers);
  console.log(bearerToken, jwtClaims);

  context.res = {
    status: 200,
    body: jwtClaims,
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export default httpTrigger;
