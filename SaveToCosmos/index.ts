import {
  AzureFunction,
  Context,
  HttpRequest,
  Response
} from "@azure/functions";
import * as E from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import { toUndefined } from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { isRight } from "fp-ts/lib/These";
import { UserCreateRequest, validateUser } from "../dtos/user.dto";
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

const createUserAsync = (user: UserCreateRequest) =>
  pipe(user, user => createDocument<User>(user, "Users"));

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<Response> {
  const { body } = req;

  const userValidationResult = flow(
    validateUser,
    E.mapLeft(errors => ({ validationErrors: errors }))
  )(body);

  if (isRight(userValidationResult)) {
    console.log("User to write", userValidationResult.right);
    const createUser = await createUserAsync(userValidationResult.right);

    return {
      res: {
        body: toUndefined(createUser.item),
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    };
  } else {
    return {
      res: {
        body: userValidationResult.left,
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    };
  }
};

export default httpTrigger;
