import { Response } from "@azure/functions";
import {
  badRequest,
  notFound,
  okObject,
  unauthorized
} from "../../util/function-response/functions-response.util";

describe("function-response", () => {
  const jsonResponseHeaders = {
    "content-type": "application/json"
  };

  it("correctly maps for an okObject response", () => {
    const responseBody = { hello: "world" };
    const actualResponse = okObject(responseBody);

    expect(actualResponse).toStrictEqual<Response>({
      status: 200,
      body: responseBody,
      headers: jsonResponseHeaders
    });
  });

  it("correctly maps for a badRequest response", () => {
    const responseBody = { errors: ["error1", "error2"] };
    const actualResponse = badRequest(responseBody);

    expect(actualResponse).toStrictEqual<Response>({
      status: 400,
      body: responseBody,
      headers: jsonResponseHeaders
    });
  });

  it("correctly maps for a unauthorized response", () => {
    const actualResponse = unauthorized();

    expect(actualResponse).toEqual<Response>({
      status: 401
    });
  });

  it("correctly maps for a notFound response", () => {
    const actualResponse = notFound();

    expect(actualResponse).toEqual<Response>({
      status: 404
    });
  });
});
