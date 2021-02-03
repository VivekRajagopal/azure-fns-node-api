import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  console.log(req.query);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Yeeto Cheeto"
  };
};

export default httpTrigger;
