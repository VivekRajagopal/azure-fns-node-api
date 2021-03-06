import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ValidateJwt } from "./validate-jwt.dto";

const httpTrigger: AzureFunction = async function (
  context: Context,
  _req: HttpRequest,
  decodedJwt: ValidateJwt
): Promise<void> {
  if (!decodedJwt.isValid) {
    context.res = {
      status: 400,
      body: "Invalid Bearer Token"
    };
  } else {
    context.res = {
      status: 200,
      body: decodedJwt.token.payload,
      headers: {
        "x-custom-extensions-param": decodedJwt.bindingParam
      }
    };
  }

  context.res.headers = {
    ...context.res.headers,
    "content-type": "application/json"
  };
};

export default httpTrigger;
