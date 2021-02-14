import { AzureFunction, HttpRequest, TypedContext } from "@azure/functions";
import { getTodoAsync } from "../services/todos/todo-api.service";

const httpTrigger: AzureFunction = async function (
  context: TypedContext<{ todoId: string }>,
  _req: HttpRequest
): Promise<void> {
  const todo = await getTodoAsync(context.bindingData.todoId);

  context.res = {
    body: todo,
    headers: {
      "content-type": "application/json"
    }
  };
};

export default httpTrigger;
