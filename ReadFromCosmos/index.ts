import {
  AzureFunction,
  HttpRequest,
  Response,
  TypedContext
} from "@azure/functions";
import * as O from "fp-ts/lib/Option";
import { User } from "../services/users/user.model";
import usersCollection from "../services/users/users-collection";
import {
  notFound,
  okObject
} from "../util/function-response/functions-response.util";

const httpTrigger: AzureFunction = async function (
  context: TypedContext<{ docId: string }>,
  req: HttpRequest
): Promise<void> {
  const { docId } = context.bindingData;

  const user = await usersCollection.getDocument<User>(docId);

  const result: Response = O.fold(notFound, okObject)(user);

  context.res = result;
};

export default httpTrigger;
