import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as E from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import {
  UserCreateRequest,
  validateUser
} from "./dtos/user-create-request.dto";
import { User } from "../services/users/user.model";
import usersCollection from "../services/users/users-collection";
import {
  badRequest,
  okObject
} from "../util/function-response/functions-response.util";

const createUserAsync = (user: UserCreateRequest) =>
  pipe(user, user => usersCollection.createDocument<User>(user));

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { body } = req;

  const userValidationResult = flow(
    validateUser,
    E.mapLeft(errors => ({ validationErrors: errors }))
  )(body);

  if (E.isRight(userValidationResult)) {
    const createUser = await createUserAsync(userValidationResult.right);

    context.res = okObject(createUser);
  } else {
    context.res = badRequest(userValidationResult.left);
  }
};

export default httpTrigger;
