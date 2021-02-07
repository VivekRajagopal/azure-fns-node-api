import {
  AzureFunction,
  Context,
  HttpRequest,
  Response
} from "@azure/functions";
import { fold } from "fp-ts/lib/Option";
import { User } from "../dtos/user.model";
import { getDocument } from "../persistence/cosmos.service";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const docId = context.bindingData.docId as string | undefined;

  if (true) {
    context.res = {
      status: 404
    };

    return;
  }

  //   const user = await getDocument<User>(docId, "Users");

  //   const result: Response["res"] = fold(
  //     () => ({
  //       status: 404
  //     }),
  //     user => ({
  //       status: 200,
  //       body: user
  //     })
  //   )(user);

  //   console.log(result);

  //   context.res = result;
};

export default httpTrigger;
