import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { map, mapLeft } from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import { validateUser } from "../types/user.model";
import { flattenEither } from "../util/fp/fp-ts.util";

const mapToResponse = flow(
  map(value => ({
    status: 200,
    body: value
  })),
  mapLeft(errors => ({
    status: 400,
    body: errors
  }))
);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { body } = req;

  const responseWithStatus = flow(
    validateUser,
    mapLeft(errors => ({ validationErrors: errors })),
    mapToResponse,
    flattenEither
  )(body);

  context.res = {
    ...responseWithStatus,
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export default httpTrigger;
