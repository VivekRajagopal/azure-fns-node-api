import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { mapLeft } from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import { isRight } from "fp-ts/lib/These";
import { validateUser } from "../dtos/user.dto";
import { User } from "../dtos/user.model";
import { createDocument } from "../persistence/cosmos.service";

const mapToResponse = flow(
  TE.map(value => ({
    status: 200,
    body: value
  })),
  TE.mapLeft(errors => ({
    status: 400,
    body: errors
  }))
);

const createUserAsync = (user: User) =>
  pipe(user, user => createDocument(user, "Users"));

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { body } = req;

  const userValidationResult = await flow(
    validateUser,
    mapLeft(errors => ({ validationErrors: errors }))
  )(body);

  if (isRight(userValidationResult)) {
    const createUser = await createUserAsync(userValidationResult.right);
    context.res = {
      body: createUser,
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    };
  } else {
    context.res = {
      body: userValidationResult.left,
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
};

export default httpTrigger;
